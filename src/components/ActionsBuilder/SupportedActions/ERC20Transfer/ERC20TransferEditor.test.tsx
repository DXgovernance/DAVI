import { BigNumber } from 'ethers';
import { render } from 'utils/tests';
import { fireEvent } from '@testing-library/react';
import ERC20TransferEditor from './ERC20TransferEditor';
import {
  erc20TransferDecodedCallMock,
  erc20TransferEmptyDecodedCallMock,
} from './fixtures';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from 'hooks/Guilds/ens/fixtures';

const mockBigNumber = BigNumber.from(100000000);

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    imageUrl: 'wagmi',
  }),
}));

jest.mock('hooks/Guilds/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockBigNumber,
  }),
}));

const mockChainId = 123456;
jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: mockChainId } }),
  useAccount: () => ({ address: MOCK_ADDRESS }),
}));

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [],
  }),
}));

jest.mock('hooks/Guilds/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: () => ({
    data: [],
  }),
}));

jest.mock('hooks/Guilds/ens/useENS', () => ({
  __esModule: true,
  default: (value: string) => {
    if (value === MOCK_ENS_NAME || value === MOCK_ADDRESS) {
      return { name: MOCK_ENS_NAME, address: MOCK_ADDRESS };
    } else {
      return { name: null, address: value };
    }
  },
}));

describe('ERC20TransferEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferDecodedCallMock}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot with an address without ENS name', () => {
    const { container } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferDecodedCallMock}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot with default values', () => {
    const { container } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferEmptyDecodedCallMock}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not call onSubmit with bad inputs', async () => {
    const onSubmit = jest.fn();
    const { findByTestId } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferEmptyDecodedCallMock}
        onSubmit={onSubmit}
      />
    );
    const submitButton = await findByTestId('submit-erc20transfer');

    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('Parses decodedCall data', async () => {
    const { findByDisplayValue } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferDecodedCallMock}
        onSubmit={jest.fn()}
      />
    );

    const tokenAddress = await findByDisplayValue(MOCK_ENS_NAME);

    expect(tokenAddress).toBeInTheDocument();
  });
});
