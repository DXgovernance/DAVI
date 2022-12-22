import { GovernanceCapabilities } from 'stores/types';

export const erc20GuildCapabilities: Readonly<GovernanceCapabilities> = {
  votingPower: 'liquid',
  tokenType: 'ERC20',
  consensus: 'quorum',
  votingStyle: 'competition',
};
