import { BigNumber } from 'ethers';
import { render } from '../../../../utils/tests';
import ERC20TransferInfoLine from './ERC20TransferInfoLine';
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

describe('ERC20TransferInfoLine', () => {
  it('renders', () => {
    const { container } = render(
      <ERC20TransferInfoLine decodedCall={erc20TransferDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders in compact mode', () => {
    const { container } = render(
      <ERC20TransferInfoLine
        decodedCall={erc20TransferDecodedCallMock}
        compact={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders without data', () => {
    const { container } = render(<ERC20TransferInfoLine decodedCall={null} />);
    expect(container).toMatchSnapshot();
  });

  it('renders without data in compact mode', () => {
    const { container } = render(
      <ERC20TransferInfoLine decodedCall={null} compact={true} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders with default values', () => {
    const { container } = render(
      <ERC20TransferInfoLine decodedCall={erc20TransferEmptyDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders with default values in compact mode', () => {
    const { container } = render(
      <ERC20TransferInfoLine
        decodedCall={erc20TransferEmptyDecodedCallMock}
        compact={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
