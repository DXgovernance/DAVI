import { BigNumber } from 'ethers';
import { render } from '../../../../utils/tests';
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

describe('ERC20TransferSummary', () => {
  it('renders', () => {
    const { container } = render(
      <ERC20TransferSummary decodedCall={erc20TransferDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders without data', () => {
    const { container } = render(<ERC20TransferSummary decodedCall={null} />);
    expect(container).toMatchSnapshot();
  });
  it('renders with default values', () => {
    const { container } = render(
      <ERC20TransferSummary decodedCall={erc20TransferEmptyDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
});
