import { render } from 'utils/tests';
import { CallDetails } from './CallDetails';
import {
  approvetokenSpendingMock,
  decodedCallMock,
  emptyDecodedCallMock,
} from './fixtures';

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

jest.mock('utils', () => ({
  getNetworkById: () => ({
    nativeAsset: {
      symbol: 'TST',
    },
  }),
}));

jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: 1 } }),
  chain: {
    mainnet: {},
  },
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
}));

describe('CallDetails', () => {
  it('Should match', () => {
    const { container } = render(<CallDetails decodedCall={decodedCallMock} />);
    expect(container).toMatchSnapshot();
  });

  it('Should match with empty data', () => {
    const { container } = render(
      <CallDetails
        decodedCall={emptyDecodedCallMock}
        approveSpendTokens={approvetokenSpendingMock}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
