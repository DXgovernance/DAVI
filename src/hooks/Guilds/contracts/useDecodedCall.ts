import { useEffect, useRef, useState } from 'react';
import { utils } from 'ethers';
import { useNetwork } from 'wagmi';
import {
  RichContractData,
  useRichContractRegistry,
} from './useRichContractRegistry';
import ERC20 from 'contracts/ERC20.json';
import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import PermissionRegistry from 'contracts/PermissionRegistry.json';
import ENSPublicResolver from 'contracts/ENSPublicResolver.json';
import BaseERC20Guild from 'contracts/BaseERC20Guild.json';

import {
  ApproveSendTokens,
  Call,
  DecodedCall,
  Option,
  SupportedAction,
} from 'components/ActionsBuilder/types';
import {
  ERC20_APPROVE_SIGNATURE,
  ERC20_TRANSFER_SIGNATURE,
  SET_PERMISSION_SIGNATURE,
  MINT_REP_SIGNATURE,
  ENS_UPDATE_CONTENT_SIGNATURE,
  SET_GUILD_CONFIG_SIGNATURE,
} from 'utils';
import { lookUpContractWithSourcify } from 'utils/sourcify';

const knownSigHashes: Record<string, { callType: SupportedAction; ABI: any }> =
  {
    [ERC20_TRANSFER_SIGNATURE]: {
      callType: SupportedAction.ERC20_TRANSFER,
      ABI: ERC20.abi,
    },
    [ERC20_APPROVE_SIGNATURE]: {
      callType: SupportedAction.GENERIC_CALL,
      ABI: ERC20.abi,
    },
    [SET_PERMISSION_SIGNATURE]: {
      callType: SupportedAction.SET_PERMISSIONS,
      ABI: PermissionRegistry.abi,
    },
    [MINT_REP_SIGNATURE]: {
      callType: SupportedAction.REP_MINT,
      ABI: ERC20SnapshotRep.abi,
    },
    [ENS_UPDATE_CONTENT_SIGNATURE]: {
      callType: SupportedAction.ENS_UPDATE_CONTENT,
      ABI: ENSPublicResolver.abi,
    },
    [SET_GUILD_CONFIG_SIGNATURE]: {
      callType: SupportedAction.SET_GUILD_CONFIG,
      ABI: BaseERC20Guild.abi,
    },
  };

const decodeCallUsingEthersInterface = (
  call: Call,
  contractInterface: utils.Interface,
  callType?: SupportedAction
): DecodedCall => {
  // Get the first 10 characters of Tx data, which is the Function Selector (SigHash).
  const sigHash = call.data.substring(0, 10);

  // Find the ABI function fragment for the sighash.
  const functionFragment = contractInterface.getFunction(sigHash);

  if (!functionFragment) return null;

  // Decode the function parameters.
  const params = contractInterface.decodeFunctionData(
    functionFragment,
    call.data
  );

  const paramsJson = functionFragment.inputs.reduce((acc, input) => {
    acc[input.name] = params[input.name];
    return acc;
  }, {} as Record<string, any>);

  return {
    callType: callType || SupportedAction.GENERIC_CALL,
    from: call.from,
    to: call.to,
    value: call.value,
    function: functionFragment,
    args: paramsJson,
    optionalProps: {
      asset: paramsJson?.to ?? '',
    },
  };
};

const getContractInterfaceFromRichContractData = (
  richContractData: RichContractData
) => {
  return {
    contractInterface: richContractData.contractInterface,
    callType: SupportedAction.GENERIC_CALL,
  };
};

const getContractFromKnownSighashes = (data: string) => {
  if (!data) return null;

  // Get the first 10 characters of Tx data, which is the Function Selector (SigHash).
  const sigHash = data.substring(0, 10);
  // Heuristic detection using known sighashes
  const match = knownSigHashes[sigHash];
  if (!match) return null;

  let contractInterface = new utils.Interface(match.ABI);
  return {
    contractInterface,
    callType: match.callType,
  };
};

export const decodeCall = async (
  call: Call,
  contracts: RichContractData[],
  chainId: number
) => {
  let decodedCall: DecodedCall = null;
  // Detect native asset transfer
  if (!call.data || utils.hexValue(call.data) === utils.hexValue(0)) {
    decodedCall = {
      callType: SupportedAction.NATIVE_TRANSFER,
      from: call.from,
      to: call.to,
      value: call.value,
      function: null,
      args: null,
    };
    return {
      id: `action-${Math.random()}`,
      decodedCall,
      contract: null,
      approval: call.approval || null,
    };
  }

  // Detect using the rich contract data registry.
  const matchedRichContractData = contracts?.find(
    contract =>
      contract.networks[chainId].toLocaleLowerCase() ===
      call.to.toLocaleLowerCase()
  );
  let matchedContract = matchedRichContractData
    ? getContractInterfaceFromRichContractData(matchedRichContractData)
    : getContractFromKnownSighashes(call.data);

  if (!matchedContract) {
    const abi = await lookUpContractWithSourcify({ chainId, address: call.to });
    if (abi)
      matchedContract = {
        contractInterface: new utils.Interface(abi),
        callType: SupportedAction.GENERIC_CALL,
      };
  }
  if (!matchedContract) {
    decodedCall = {
      callType: SupportedAction.RAW_TRANSACTION,
      from: call.from,
      to: call.to,
      value: call.value,
      function: null,
      args: {},
      optionalProps: {
        data: '0x01',
      },
    };

    return {
      id: `action-${Math.random()}`,
      decodedCall,
      contract: null,
      approval: null,
    };
  }
  const { callType, contractInterface } = matchedContract;

  decodedCall = decodeCallUsingEthersInterface(
    call,
    contractInterface,
    callType
  );

  if (decodedCall && matchedRichContractData) {
    decodedCall.richData = matchedRichContractData;
    // TODO better match function signature to include type checks
    decodedCall.richFunctionData = matchedRichContractData.functions.find(
      option =>
        option.functionName === decodedCall.function.name &&
        option.params.length === decodedCall.function.inputs.length
    );
  }

  return {
    id: `action-${Math.random()}`,
    decodedCall,
    contract: contractInterface,
    approval: call.approval || null,
  };
};

export const bulkDecodeCallsFromOptions = (
  options: Option[],
  contracts: RichContractData[],
  chainId: number
) => {
  return Promise.all(
    options.map(async option => {
      const { actions } = option;
      const actionPromisesArray = actions.map(
        async action => await decodeCall(action, contracts, chainId)
      );
      const decodedActions = await Promise.all(actionPromisesArray);
      return {
        ...option,
        decodedActions,
      };
    })
  );
};

interface DecodedCallResult {
  id: string;
  decodedCall: DecodedCall;
  contract: utils.Interface;
  approval: ApproveSendTokens;
}

export const useDecodedCall = (call: Call) => {
  const [decodedCall, setDecodedCall] = useState<DecodedCallResult>(null);
  const isCancelled = useRef(false);
  const { chain } = useNetwork();
  const { contracts } = useRichContractRegistry();

  useEffect(() => {
    if (call && !isCancelled.current) {
      decodeCall(call, contracts, chain?.id).then(decodedData => {
        setDecodedCall(decodedData);
      });
    } else if (!call) {
      setDecodedCall(null);
    }
    return () => {
      isCancelled.current = true;
    };
  }, [call, contracts, chain]);

  return (
    decodedCall || {
      id: null,
      decodedCall: null,
      contract: null,
      approval: null,
    }
  );
};
