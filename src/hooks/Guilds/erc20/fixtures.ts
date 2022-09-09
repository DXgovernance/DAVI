import { BigNumber } from 'ethers';

export const MOCK_WALLET_ADDRESS = '0x0000000000000000000000000000000000000000';
export const MOCK_SPENDER_ADDRESS =
  '0x0000000000000000000000000000000000000001';
export const MOCK_CONTRACT_ADDRESS =
  '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa';
export const MOCK_BIG_NUMBER = BigNumber.from(100);
export const MOCK_NAME = 'WAGMI';
export const MOCK_SYMBOL = 'WAG';
export const MOCK_DECIMALS = 0;

export const MOCK_TOKEN_INFO = {
  decimals: MOCK_DECIMALS,
  name: MOCK_NAME,
  symbol: MOCK_SYMBOL,
  balance: MOCK_BIG_NUMBER,
  chainId: 1,
  address: MOCK_CONTRACT_ADDRESS,
  type: 'ERC20',
  logoURI: '',
};
