import { useProposal } from './modules/common/fetchers/useProposal';
import { useSnapshotId } from './modules/common/fetchers/useSnapshotId';
import { useTotalLocked } from './modules/SnapshotERC20Guild/fetchers/default/useTotalLocked';

interface GovernanceCapabilities {
  votingPower: 'soulbound' | 'hybrid' | 'liquid';
  tokenType: 'ERC20' | 'ERC721';
  consensus: 'holographic' | 'quorum';
  votingStyle: 'binary' | 'competition';
  votingPowerTally: 'snapshot' | 'live';
}

type SupportedGovernanceSystem = 'SnapshotERC20Guild' | 'SnapshotRepGuild';

export interface FetcherHooksInterface {
  useProposal: (
    daoId: string,
    proposalId: `0x${string}`
  ) => ReturnType<typeof useProposal>;
  useSnapshotId: (useSnapshotIdProps: {
    contractAddress: string;
    proposalId: `0x${string}`;
  }) => ReturnType<typeof useSnapshotId>;
  useTotalLocked: (
    guildAddress: string,
    proposalId?: `0x${string}`
  ) => ReturnType<typeof useTotalLocked>;
}

interface HooksInterface {
  events: null;
  fetchers: FetcherHooksInterface;
  writers: null;
}

export interface GovernanceInterface {
  name: SupportedGovernanceSystem;
  bytecodes: `0x${string}`[];
  hooks: HooksInterface;
  hooksFallback: HooksInterface;
  capabilities: GovernanceCapabilities;
  checkDataSourceAvailability: () => boolean;
}

export interface HookStoreContextInterface
  extends Omit<GovernanceInterface, 'hooksFallback'> {
  isLoading: boolean;
  daoId: string;
}

// TODO: here, the types depend on a very specific return type of the hook. Maybe at some point this should change, or have our own defined return types instead of relying on ReturnType<typeof hook>
