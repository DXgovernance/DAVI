import { GovernanceInterface } from 'stores/types';
import { useProposal, useSnapshotId } from '../common/fetchers';
import { useTotalLocked as useTotalLockedDefault } from './fetchers/subgraphSnapshotRep';
import { useTotalLocked as useTotalLockedFallback } from './fetchers/wagmiSnapshotRep';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';

export const snapshotRepGuildImplementation: Readonly<GovernanceInterface> = {
  name: 'SnapshotRepGuild',
  bytecodes: [
    '0x5220f03f768c7f09437ccf760eb5307dc60f60e18c9c9ff9599a9ab3ad71d2a0',
    '0xb33418b664bfb6eba3ea37a77429d95daee4f0ab24f47ee63c4669340c4aae5a',
  ],
  hooks: {
    events: null,
    fetchers: {
      useProposal,
      useSnapshotId,
      useTotalLocked: useTotalLockedDefault,
    },
    writers: null,
  },
  hooksFallback: {
    events: null,
    fetchers: {
      useProposal,
      useSnapshotId,
      useTotalLocked: useTotalLockedFallback,
    },
    writers: null,
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
