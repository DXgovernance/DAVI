import { TokenWithBalance } from 'hooks/Guilds/erc20/useAllERC20Balances';

export type TokenWithBalanceIndexable = TokenWithBalance & { id: string };

export interface MenuItemProps {
  icon?: any;
  title: string;
  action?: () => void;
  isActive?: () => boolean;
}
