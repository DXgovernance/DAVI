import { snapshotERC20GuildImplementation } from './modules/SnapshotERC20Guild';
import { GovernanceInterface } from './types';

export const governanceInterfaces: GovernanceInterface[] = [
  snapshotERC20GuildImplementation,
];
