import { DecodedAction } from './types';
import { Permission } from './types';
import Web3 from 'web3';
import { NULL_SIGNATURE } from 'utils';
import { SupportedAction } from './types';

const web3 = new Web3();

export const getPermissionArgs = (
  decodedActions: DecodedAction[]
): Permission[] => {
  const permissions = decodedActions.map(decodedAction => {
    // Native transfer of ETH does not have a function
    if (
      decodedAction?.decodedCall?.callType ===
        SupportedAction.NATIVE_TRANSFER ||
      decodedAction?.decodedCall?.callType === SupportedAction.RAW_TRANSACTION
    ) {
      return {
        from: decodedAction?.decodedCall?.from,
        to: decodedAction?.decodedCall?.to,
        callType: decodedAction?.decodedCall?.callType,
        functionSignature: NULL_SIGNATURE,
      };
    }
    const functionInputs = decodedAction?.decodedCall?.function?.inputs?.map(
      input => input.type
    );
    const functionName = decodedAction?.decodedCall?.function?.name;
    const functionSignature = web3.eth.abi.encodeFunctionSignature(
      `${functionName}(${functionInputs.join(',')})`
    );
    return {
      from: decodedAction?.decodedCall?.from,
      to: decodedAction?.decodedCall?.to,
      callType: decodedAction?.decodedCall?.callType,
      functionSignature,
    };
  });
  return permissions;
};
