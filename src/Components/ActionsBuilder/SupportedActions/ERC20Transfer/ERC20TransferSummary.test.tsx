import { mockChain } from 'Components/Web3Modals/fixtures';
import { BigNumber } from 'ethers';
import { ZERO_ADDRESS } from 'utils';
import { render } from 'utils/tests';
import ERC20TransferSummary from './ERC20TransferSummary';
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

jest.mock('utils', () => ({
  getNetworkById: () => ({ nativeAsset: { symbol: 'ETH' } }),
}));

const mockAddress = ZERO_ADDRESS;
jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
  useAccount: () => ({ address: mockAddress }),
}));

describe('ERC20TransferSummary', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <ERC20TransferSummary decodedCall={erc20TransferDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
  it('Should match snapshot without data', () => {
    const { container } = render(<ERC20TransferSummary decodedCall={null} />);
    expect(container).toMatchSnapshot();
  });
  it('Should match snapshot with default values', () => {
    const { container } = render(
      <ERC20TransferSummary decodedCall={erc20TransferEmptyDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
});
