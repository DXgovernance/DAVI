import { FullGovernanceImplementation } from 'stores/types';
import { useProposal, useSnapshotId } from '../common/fetchers';
import { useTotalLocked } from './fetchers/wagmiSnapshotRep';
import { useLockTokens } from './writers';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';

export const snapshotRepGuildImplementation: Readonly<FullGovernanceImplementation> =
  {
    name: 'SnapshotRepGuild',
    bytecodes: [
      '0x5220f03f768c7f09437ccf760eb5307dc60f60e18c9c9ff9599a9ab3ad71d2a0',
      '0xb33418b664bfb6eba3ea37a77429d95daee4f0ab24f47ee63c4669340c4aae5a',
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
        useLockTokens,
      },
    },
    capabilities: {
      votingPower: 'soulbound',
      tokenType: 'ERC20',
      consensus: 'quorum',
      votingStyle: 'competition',
      votingPowerTally: 'snapshot',
    },
    checkDataSourceAvailability,
  };
