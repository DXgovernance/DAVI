import { snapshotERC20GuildImplementation } from './modules/SnapshotERC20Guild';
import { snapshotRepGuildImplementation } from './modules/SnapshotRepGuild';
import { GovernanceInterface } from './types';

export const governanceInterfaces: GovernanceInterface[] = [
  snapshotERC20GuildImplementation,
  snapshotRepGuildImplementation,
];
