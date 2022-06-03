import { TokenWithBalance } from 'hooks/Guilds/ether-swr/erc20/useAllERC20Balances';
import { IconType } from 'react-icons/lib';

export type TokenWithBalanceIndexable = TokenWithBalance & { id: string };

export interface TokenPickerProps {
  walletAddress?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tokenAddress: string) => void;
}

export interface MenuItemProps {
  icon?: IconType;
  title: string;
  action?: () => void;
  isActive?: () => boolean;
}
