import useProposal from './modules/SnapshotERC20Guild/fetchers/useProposal';
import useSnapshotId from './modules/SnapshotERC20Guild/fetchers/useSnapshotId';
import useTotalLocked from './modules/SnapshotERC20Guild/fetchers/useTotalLocked';

interface GovernanceCapabilities {
  votingPower: 'soulbound' | 'hybrid' | 'liquid';
  tokenType: 'ERC20' | 'ERC721';
  consensus: 'holographic' | 'quorum';
  votingStyle: 'binary' | 'competition';
  votingPowerTally: 'snapshot' | 'live';
}

type SupportedGovernanceSystem = 'SnapshotERC20Guild' | 'SnapshotRepGuild';

export interface GovernanceInterface {
  name: SupportedGovernanceSystem;
  bytecode: `0x${string}`;
  hooks: {
    events: null; //! change when implemented
    fetchers: FetcherHooksInterface;
    writers: null; //! change when implemented
  };
  capabilities: GovernanceCapabilities;
}

export interface FetcherHooksInterface {
  useProposal: (
    guildId: string,
    proposalId: `0x${string}`
  ) => ReturnType<typeof useProposal>;
  useSnapshotId: (useSnapshotIdProps: {
    contractAddress: string;
    proposalId: `0x${string}`;
  }) => ReturnType<typeof useSnapshotId>;
  useTotalLocked: (
    guildAddress: string,
    snapshotId?: string
  ) => ReturnType<typeof useTotalLocked>;
}

// TODO: here, the types depend on a very specific return type of the hook. Maybe at some point this should change, or have our own defined return types instead of relying on ReturnType<typeof hook>
