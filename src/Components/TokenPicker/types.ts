import { TokenWithBalance } from 'hooks/Guilds/ether-swr/erc20/useAllERC20Balances';

export type TokenWithBalanceIndexable = TokenWithBalance & { id: string };

export interface TokenPickerProps {
  walletAddress?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tokenAddress: string) => void;
}
