import { TokenWithBalance } from 'hooks/Guilds/ether-swr/erc20/useAllERC20Balances';

export type TokenWithBalanceIndexable = TokenWithBalance & { id: string };

export interface MenuItemProps {
  icon?: any;
  title: string;
  action?: () => void;
  isActive?: () => boolean;
}
