import { FullGovernanceImplementation } from 'stores/types';
import { useProposal, useSnapshotId } from '../common/fetchers';
import { useTotalLocked } from './fetchers/default';
import {
  useApproveTokens,
  useCreateProposal,
  useExecuteProposal,
  useLockTokens,
  useVoteOnProposal,
  useWithdrawTokens,
} from './writers';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';

/* 
  I left this case purposefully with just one data source (default), 
  to show that a governance implementation doesn't need two sources.
*/
export const snapshotERC20GuildImplementation: Readonly<FullGovernanceImplementation> =
  {
    name: 'SnapshotERC20Guild',
    bytecodes: [
      '0xfc721cf4ee3e10d6df0dc8659bc71c86ec7b2116001838e1d9bc30ccfbe8cfac',
      '0xcfe42d56f58ab49603c49e6c7ca4bd3d2260cec51d296e4a5cfa2a407e299b6c',
    ],
    hooks: {
      fetchers: {
        default: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
        },
        fallback: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
        },
      },
      writers: {
        useApproveTokens,
        useCreateProposal,
        useExecuteProposal,
        useLockTokens,
        useVoteOnProposal,
        useWithdrawTokens,
      },
    },
    capabilities: {
      votingPower: 'liquid',
      tokenType: 'ERC20',
      consensus: 'quorum',
      votingStyle: 'competition',
      votingPowerTally: 'snapshot',
    },
    checkDataSourceAvailability,
  };
