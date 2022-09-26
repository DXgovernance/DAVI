import { BigNumber, utils } from 'ethers';
import {
  DecodedAction,
  DecodedCall,
  SupportedAction,
  ApproveSendTokens,
} from 'components/ActionsBuilder/types';
import ENSPublicResolver from 'contracts/ENSPublicResolver.json';
import ERC20 from 'contracts/ERC20.json';
import ERC20Guild from 'contracts/ERC20Guild.json';
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
import SetGuildConfigInfoLine from './SetGuildConfig/SetGuildConfigInfoLine';
import SetGuildConfigEditor from './SetGuildConfig/SetGuildConfigEditor';
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
  },
  [SupportedAction.ERC20_TRANSFER]: {
    title: 'Transfers & Mint',
    infoLineView: ERC20TransferInfoLine,
    summaryView: Summary,
    editor: ERC20TransferEditor,
  },
  [SupportedAction.REP_MINT]: {
    title: 'Mint Reputation',
    infoLineView: RepMintInfoLine,
    summaryView: Summary,
    editor: RepMintEditor,
  },
  [SupportedAction.GENERIC_CALL]: {
    title: 'Generic Call',
    infoLineView: GenericCallInfoLine,
    summaryView: Summary,
    editor: () => <div>Generic Call Editor</div>,
  },
  [SupportedAction.SET_PERMISSIONS]: {
    title: 'Set permissions',
    infoLineView: SetPermissionsInfoLine,
    summaryView: Summary,
    editor: SetPermissionsEditor,
  },
  [SupportedAction.ENS_UPDATE_CONTENT]: {
    title: 'Update ENS content',
    infoLineView: UpdateENSContentInfoLine,
    summaryView: UpdateENSContentSummary,
    editor: UpdateENSContentEditor,
  },
  [SupportedAction.SET_GUILD_CONFIG]: {
    title: 'Set Guild Config',
    infoLineView: SetGuildConfigInfoLine,
    summaryView: Summary,
    editor: SetGuildConfigEditor,
  },
};
const ERC20Contract = new utils.Interface(ERC20.abi);
const ERC20GuildContract = new utils.Interface(ERC20Guild.abi);
const ERC20SnapshotRepContract = new utils.Interface(ERC20SnapshotRep.abi);
const ENSPublicResolverContract = new utils.Interface(ENSPublicResolver.abi);
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
      value: '',
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
        _value: '',
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
        amount: '',
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
      value: '',
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
        valueAllowed: '',
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
  [SupportedAction.SET_GUILD_CONFIG]: {
    id: '',
    contract: ENSPublicResolverContract,
    decodedCall: {
      from: '',
      callType: SupportedAction.ENS_UPDATE_CONTENT,
      function: ERC20GuildContract.getFunction('setConfig'),
      to: '',
      value: BigNumber.from(0),
      args: {
        proposalTime: '',
        timeForExecution: '',
        votingPowerForProposalExecution: '',
        votingPowerForProposalCreation: '',
        voteGas: '',
        maxGasPrice: '',
        maxActiveProposals: '',
        lockTime: '',
        minimumMembersForProposalCreation: '',
        minimumTokensLockedForProposalCreation: '',
      },
      optionalProps: {
        updatedFields: {},
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
