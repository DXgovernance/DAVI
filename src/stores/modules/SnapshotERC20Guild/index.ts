import { GovernanceInterface } from 'stores/types';
import useProposal from '../common/fetchers/useProposal';
import useSnapshotId from '../common/fetchers/useSnapshotId';
import useTotalLocked from './fetchers/useTotalLocked';

export const snapshotERC20GuildImplementation: Readonly<GovernanceInterface> = {
  name: 'SnapshotERC20Guild',
  bytecode:
    '0xfc721cf4ee3e10d6df0dc8659bc71c86ec7b2116001838e1d9bc30ccfbe8cfac',
  hooks: {
    events: null,
    fetchers: {
      useProposal,
      useSnapshotId,
      useTotalLocked,
    },
    writers: null,
  },
  capabilities: {
    votingPower: 'liquid',
    tokenType: 'ERC20',
    consensus: 'quorum',
    votingStyle: 'competition',
    votingPowerTally: 'snapshot',
  },
};