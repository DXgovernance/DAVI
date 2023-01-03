import { BigNumber } from 'ethers';
import { useProposal } from './modules/common/fetchers/useProposal';
import { useSnapshotId } from './modules/common/fetchers/useSnapshotId';
import { useCreateProposal } from './modules/common/writers';
import { useTotalLocked } from './modules/SnapshotERC20Guild/fetchers/default/useTotalLocked';
import {
  useLockTokens,
  useApproveTokens,
} from './modules/SnapshotERC20Guild/writers';

interface GovernanceCapabilities {
  votingPower: 'soulbound' | 'hybrid' | 'liquid';
  tokenType: 'ERC20' | 'ERC721';
  consensus: 'holographic' | 'quorum';
  votingStyle: 'binary' | 'competition';
  votingPowerTally: 'snapshot' | 'live';
}
// TODO: make a series of utils that parses the capabilities and translates them to a series of boolean flags, to make it easier to conditionally render UI elements

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
    daoId: string,
    proposalId?: `0x${string}`
  ) => ReturnType<typeof useTotalLocked>;
}

export interface WriterHooksInteface {
  useLockTokens: (
    guildAddress: string,
    stakeAmount: BigNumber,
    decimals?: number,
    symbol?: string
  ) => ReturnType<typeof useLockTokens>;
  useApproveTokens: (
    tokenAddress: `0x${string}`,
    daoTokenVault: `0x${string}`,
    amount?: string
  ) => ReturnType<typeof useApproveTokens>;
  useCreateProposal: (
    daoContractAdress: string
  ) => ReturnType<typeof useCreateProposal>;
}

// TODO: here, the types depend on a very specific return type of the hook. Maybe at some point this should change, or have our own defined return types instead of relying on ReturnType<typeof hook>

// TODO: useSnapshotId and implementation-specific hooks should be removed when all the hooks are ported. That logic should only reside inside the implementation, not as a global hook

interface HooksInterfaceWithFallback {
  fetchers: {
    default: FetcherHooksInterface;
    fallback: FetcherHooksInterface;
  };
  writers: WriterHooksInteface;
}

interface HooksInterfaceWithoutFallback
  extends Omit<HooksInterfaceWithFallback, 'fetchers'> {
  fetchers: FetcherHooksInterface;
}

export interface FullGovernanceImplementation {
  name: SupportedGovernanceSystem;
  bytecodes: `0x${string}`[];
  hooks: HooksInterfaceWithFallback;
  capabilities: GovernanceCapabilities;
  checkDataSourceAvailability: () => boolean;
}

export interface GovernanceTypeInterface
  extends Omit<FullGovernanceImplementation, 'hooks'> {
  hooks: HooksInterfaceWithoutFallback;
}

export interface HookStoreContextInterface extends GovernanceTypeInterface {
  isLoading: boolean;
  daoId: string;
}
