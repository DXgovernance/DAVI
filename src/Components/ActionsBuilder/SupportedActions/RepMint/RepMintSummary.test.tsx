import { BigNumber } from 'ethers';
import { render } from '../../../../utils/tests';
import RepMintSummary from './RepMintSummary';
import {
  repMintDecodedCallMock,
  repMintEmptyDecodedCallMock,
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

jest.mock('hooks/Guilds/guild/useTokenData', () => ({
  useTokenData: () => ({
    tokenData: {
      symbol: 'REP',
      decimals: 18,
      name: 'Reputation',
      address: '0x0000000000000000000000000000000000000000',
      totalSupply: mockBigNumber,
    },
  }),
}));

describe('RepMintSummary', () => {
  it('renders', () => {
    const { container } = render(
      <RepMintSummary decodedCall={repMintDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders in compact mode', () => {
    const { container } = render(
      <RepMintSummary decodedCall={repMintDecodedCallMock} compact={true} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders without data', () => {
    const { container } = render(<RepMintSummary decodedCall={null} />);
    expect(container).toMatchSnapshot();
  });

  it('renders without data in compact mode', () => {
    const { container } = render(
      <RepMintSummary decodedCall={null} compact={true} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders with default values', () => {
    const { container } = render(
      <RepMintSummary decodedCall={repMintEmptyDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders with default values in compact mode', () => {
    const { container } = render(
      <RepMintSummary
        decodedCall={repMintEmptyDecodedCallMock}
        compact={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
