import useProposal from './modules/SnapshotERC20Guild/fetchers/useProposal';

export interface GovernanceCapabilities {
  votingPower: 'soulbound' | 'hybrid' | 'liquid';
  tokenType: 'ERC20' | 'ERC721';
  consensus: 'holographic' | 'quorum';
  votingStyle: 'binary' | 'competition';
}

export type SupportedABIs = 'SnapshotERC20Guild' | 'Governance1-5';

export interface HooksInterface {
  useProposal: (
    guildId: string,
    proposalId: `0x${string}`
  ) => ReturnType<typeof useProposal>;
}

// TODO: here, the types depend on a very specific return type of the hook. Maybe at some point this should change, or have our own defined return types instead of relying on ReturnType<typeof hook>
