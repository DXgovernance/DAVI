import { BigNumber } from 'ethers';
import { render } from '../../../../utils/tests';
import ERC20TransferEditor from './ERC20TransferEditor';
import {
  erc20TransferDecodedCallMock,
  erc20TransferEmptyDecodedCallMock,
} from './fixtures';

const mockBigNumber = BigNumber.from(100000000);

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

jest.mock('hooks/Guilds/ether-swr/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockBigNumber,
  }),
}));

const mockChainId = 123456;
jest.mock('@web3-react/core', () => ({
  useWeb3React: () => ({
    chainId: mockChainId,
  }),
}));

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [],
  }),
}));

jest.mock('hooks/Guilds/ether-swr/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: () => ({
    data: [],
  }),
}));

describe('ERC20TransferEditor', () => {
  it('renders', () => {
    const { container } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferDecodedCallMock}
        updateCall={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders with default values', () => {
    const { container } = render(
      <ERC20TransferEditor
        decodedCall={erc20TransferEmptyDecodedCallMock}
        updateCall={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
