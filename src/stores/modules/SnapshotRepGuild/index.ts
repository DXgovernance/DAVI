import { GovernanceInterface } from 'stores/types';
import useProposal from './fetchers/useProposal';
import useSnapshotId from './fetchers/useSnapshotId';

export const snapshotRepGuildImplementation: Readonly<GovernanceInterface> = {
  name: 'SnapshotRepGuild',
  bytecode:
    '0x5220f03f768c7f09437ccf760eb5307dc60f60e18c9c9ff9599a9ab3ad71d2a0',
  hooks: {
    useProposal,
    useSnapshotId,
  },
  capabilities: {
    votingPower: 'soulbound',
    tokenType: 'ERC20',
    consensus: 'quorum',
    votingStyle: 'competition',
    votingPowerTally: 'snapshot',
  },
};
