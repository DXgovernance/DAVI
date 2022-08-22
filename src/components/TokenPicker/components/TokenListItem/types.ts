import { TokenInfo } from '@uniswap/token-lists';
import { TokenWithBalance } from 'hooks/Guilds/ether-swr/erc20/useAllERC20Balances';

export interface TokenProps {
  token: TokenWithBalance;
  amount?: number;
  onSelect: (token: TokenInfo) => void;
}
