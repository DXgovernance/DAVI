import { GovernanceInterface } from 'stores/types';
import useProposal from '../common/fetchers/useProposal';
import useSnapshotId from '../common/fetchers/useSnapshotId';
import useTotalLocked from './fetchers/useTotalLocked';

export const snapshotERC20GuildImplementation: Readonly<GovernanceInterface> = {
  name: 'SnapshotERC20Guild',
  bytecodes: [
    '0xfc721cf4ee3e10d6df0dc8659bc71c86ec7b2116001838e1d9bc30ccfbe8cfac',
    '0xcfe42d56f58ab49603c49e6c7ca4bd3d2260cec51d296e4a5cfa2a407e299b6c',
  ],
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
