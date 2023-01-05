import { snapshotERC20GuildImplementation } from './modules/SnapshotERC20Guild';
import { snapshotRepGuildImplementation } from './modules/SnapshotRepGuild';
import { FullGovernanceImplementation } from './types';

export const governanceInterfaces: FullGovernanceImplementation[] = [
  snapshotERC20GuildImplementation,
  snapshotRepGuildImplementation,
];
