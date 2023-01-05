import { BigNumber } from 'ethers';
import { render } from 'utils/tests';
import { CallDetails } from './CallDetails';
import {
  approvetokenSpendingMock,
  decodedCallMock,
  emptyDecodedCallMock,
} from './fixtures';

const mockBigNumber = BigNumber.from(0);

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
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

jest.mock('hooks/Guilds/tokens/useTokenList', () => ({
  useTokenList: () => ({
    tokens: [],
  }),
}));

jest.mock('utils', () => ({
  getNetworkById: () => ({
    nativeAsset: {
      symbol: 'TST',
    },
  }),
  preventEmptyString: () => mockBigNumber,
  shortenAddress: () => {},
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

jest.mock('provider/ReadOnlyConnector', () => ({
  READ_ONLY_CONNECTOR_ID: 'readOnly',
}));

jest.mock('contexts/Guilds/orbis', () => ({}));

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
