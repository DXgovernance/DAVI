import { BigNumber, utils } from 'ethers';
import {
  DecodedAction,
  DecodedCall,
  SupportedAction,
  ApproveSendTokens,
} from '../types';
import ENSPublicResolver from 'abis/ENSPublicResolver.json';
import ERC20ABI from 'abis/ERC20.json';
import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import PermissionRegistry from 'contracts/PermissionRegistry.json';
import ERC20TransferEditor from './ERC20Transfer/ERC20TransferEditor';
import ERC20TransferInfoLine from './ERC20Transfer/ERC20TransferInfoLine';
import GenericCallInfoLine from './GenericCall/GenericCallInfoLine';
import RepMintEditor from './RepMint/RepMintEditor';
import RepMintInfoLine from './RepMint/RepMintInfoLine';
import SetPermissionsEditor from './SetPermissions/SetPermissionsEditor';
import SetPermissionsInfoLine from './SetPermissions/SetPermissionsInfoLine';
import UpdateENSContentEditor from './UpdateENSContent/UpdateENSContentEditor';
import UpdateENSContentSummary from './UpdateENSContent/UpdateENSContentSummary';
import UpdateENSContentInfoLine from './UpdateENSContent/UpdateENSContentInfoLine';
import Summary from './common/Summary';
export interface SupportedActionMetadata {
  title: string;
}
export interface ActionViewProps {
  decodedCall: DecodedCall;
  approveSpendTokens?: ApproveSendTokens;
  compact?: boolean;
  noAvatar?: boolean;
}

export interface ActionEditorProps extends ActionViewProps {
  updateCall?: (updatedCall: DecodedCall) => void;
  onSubmit: (decodedCall: DecodedCall) => void;
}

type SupportedActionViews = {
  infoLineView: React.FC<ActionViewProps>;
  summaryView?: React.FC<ActionViewProps>;
};

type SupportedActionEditors = {
  editor: React.FC<ActionEditorProps>;
  displaySubmit?: boolean;
};

export const supportedActions: Record<
  SupportedAction,
  SupportedActionViews & SupportedActionEditors & SupportedActionMetadata
> = {
  [SupportedAction.NATIVE_TRANSFER]: {
    title: 'Transfers & Mint',
    infoLineView: ERC20TransferInfoLine,
    summaryView: Summary,
    editor: ERC20TransferEditor,
    displaySubmit: false,
  },
  [SupportedAction.ERC20_TRANSFER]: {
    title: 'Transfers & Mint',
    infoLineView: ERC20TransferInfoLine,
    summaryView: Summary,
    editor: ERC20TransferEditor,
    displaySubmit: false,
  },
  [SupportedAction.REP_MINT]: {
    title: 'Mint Reputation',
    infoLineView: RepMintInfoLine,
    summaryView: Summary,
    editor: RepMintEditor,
    displaySubmit: false,
  },
  [SupportedAction.GENERIC_CALL]: {
    title: 'Generic Call',
    infoLineView: GenericCallInfoLine,
    summaryView: Summary,
    editor: () => <div>Generic Call Editor</div>,
    displaySubmit: false,
  },
  [SupportedAction.SET_PERMISSIONS]: {
    title: 'Set permissions',
    infoLineView: SetPermissionsInfoLine,
    summaryView: Summary,
    editor: SetPermissionsEditor,
    displaySubmit: false,
  },
  [SupportedAction.ENS_UPDATE_CONTENT]: {
    title: 'Update ENS content',
    infoLineView: UpdateENSContentInfoLine,
    summaryView: UpdateENSContentSummary,
    editor: UpdateENSContentEditor,
    displaySubmit: true,
  },
};
const ERC20Contract = new utils.Interface(ERC20ABI);
const ERC20SnapshotRepContract = new utils.Interface(ERC20SnapshotRep.abi);
const ENSPublicResolverContract = new utils.Interface(ENSPublicResolver);
const PermissionRegistryContract = new utils.Interface(PermissionRegistry.abi);

export const defaultValues: Record<SupportedAction, DecodedAction> = {
  [SupportedAction.NATIVE_TRANSFER]: {
    id: '',
    contract: null,
    decodedCall: {
      from: '',
      callType: SupportedAction.NATIVE_TRANSFER,
      function: null,
      to: '',
      value: BigNumber.from(0),
      args: null,
    },
  },
  [SupportedAction.ERC20_TRANSFER]: {
    id: '',
    contract: ERC20Contract,
    decodedCall: {
      from: '',
      callType: SupportedAction.ERC20_TRANSFER,
      function: ERC20Contract.getFunction('transfer'),
      to: '',
      value: BigNumber.from(0),
      args: {
        _to: '',
        _value: BigNumber.from(0),
      },
    },
  },
  [SupportedAction.REP_MINT]: {
    id: '',
    contract: ERC20SnapshotRepContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.REP_MINT,
      function: ERC20SnapshotRepContract.getFunction('mint'),
      to: '',
      value: BigNumber.from(0),
      args: {
        to: '',
        amount: BigNumber.from(0),
      },
    },
  },
  [SupportedAction.GENERIC_CALL]: {
    id: '',
    contract: null,
    decodedCall: {
      from: '',
      callType: SupportedAction.GENERIC_CALL,
      function: null,
      to: '',
      args: {},
      value: BigNumber.from(0),
    },
  },
  [SupportedAction.SET_PERMISSIONS]: {
    id: '',
    contract: PermissionRegistryContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.SET_PERMISSIONS,
      function: PermissionRegistryContract.getFunction('setETHPermission'),
      to: '',
      value: BigNumber.from(0),
      args: {
        to: '',
        functionSignature: '',
        valueAllowed: BigNumber.from(0),
        allowed: true,
      },
      optionalProps: {
        asset: '',
        functionName: '',
        tab: 0,
      },
    },
  },
  [SupportedAction.ENS_UPDATE_CONTENT]: {
    id: '',
    contract: ENSPublicResolverContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.ENS_UPDATE_CONTENT,
      function: ENSPublicResolverContract.getFunction('setContenthash'),
      to: '',
      value: BigNumber.from(0),
      args: {
        node: '',
        hash: '',
      },
      optionalProps: {
        ensName: '',
        ipfsHash: '',
      },
    },
  },
};

export const getInfoLineView = (actionType: SupportedAction) => {
  if (actionType == null) return null;

  return supportedActions[actionType].infoLineView;
};

export const getSummaryView = (actionType: SupportedAction) => {
  if (actionType == null) return null;

  return supportedActions[actionType].summaryView;
};

export const getEditor = (actionType: SupportedAction) => {
  if (actionType == null) return null;

  return supportedActions[actionType].editor;
};

export const displaySubmit = (actionType: SupportedAction) => {
  if (actionType == null) return null;

  return supportedActions[actionType].displaySubmit;
};

const isApprovalCall = (action: DecodedAction) => {
  return !!action?.approval;
};

/**
 * Importance:
 * 1. rep minting
 * 2. spending calls
 * 3. transfers.
 * 4. generic calls
 *
 */
export const getActionPoints = (action: DecodedAction): number => {
  const type = action?.decodedCall?.callType;
  if (type === SupportedAction.REP_MINT) return 5;
  if (isApprovalCall(action)) return 4;
  if (type === SupportedAction.ERC20_TRANSFER) return 3;
  if (type === SupportedAction.GENERIC_CALL) return 2;
  return 1;
};
