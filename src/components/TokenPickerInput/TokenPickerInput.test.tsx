import { fireEvent, waitFor } from '@testing-library/react';
import { BigNumber } from 'ethers';
import { useState } from 'react';
import { ZERO_ADDRESS } from 'utils';
import { render } from 'utils/tests';
import TokenPickerInput from './TokenPickerInput';
import { MOCK_TOKEN_INFO } from 'hooks/Guilds/erc20/fixtures';

const mockBigNumber = BigNumber.from(100000000);

const mockAddress = ZERO_ADDRESS;

const mockChainId = 123456;
jest.mock('wagmi', () => ({
  useAccount: () => ({ address: mockAddress }),
  useNetwork: () => ({ chain: { id: mockChainId } }),
}));

jest.mock('hooks/Guilds/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockBigNumber,
  }),
}));

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

jest.mock('hooks/Guilds/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: () => ({
    data: [MOCK_TOKEN_INFO],
    isError: false,
    isLoading: false,
  }),
}));

jest.mock('Modules/Guilds/Hooks/useTypedParams', () => ({
  useTypedParams: () => ({
    guildId: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
  }),
}));

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [
      {
        chainId: 123456,
        address: '0xa1d65E8fB6e87b60FECCBc582F7f97804B725521',
        name: 'DXdao',
        decimals: 18,
        symbol: 'DXD',
        logoURI:
          'https://assets.coingecko.com/coins/images/11148/thumb/dxdao.png?1607999331',
      },
    ],
  }),
  TokenType: {
    NATIVE: 'NATIVE',
    ERC20: 'ERC20',
  },
}));

const Wrapper = () => {
  const [value, setValue] = useState('');
  const onChange = (e: string) => {
    setValue(e);
  };
  return <TokenPickerInput value={value} onChange={onChange} />;
};

console.error = jest.fn();

describe('tokenPicker', () => {
  it('should render the options', async () => {
    let result = await waitFor(() =>
      render(<Wrapper />, {
        container: document.body,
      })
    );

    const tokenPickerButton = await waitFor(() =>
      result.getByPlaceholderText('Token')
    );
    fireEvent.click(tokenPickerButton);

    const optionOne = await waitFor(() => result.getByText('WAG'));
    expect(optionOne).toBeInTheDocument();
  });
});
