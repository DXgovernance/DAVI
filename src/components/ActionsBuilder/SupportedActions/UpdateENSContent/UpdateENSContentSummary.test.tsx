import { render } from 'utils/tests';
import UpdateENSContentSummary from './UpdateENSContentSummary';
import { mockDecodedCallUpdateENSContent } from './fixtures';
import { BigNumber } from 'ethers';

jest.mock('wagmi', () => ({
  __esModule: true,
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
  useNetwork: () => ({
    chain: {
      id: 1,
      blockExplorers: {
        default: {
          url: 'https://etherscan.io',
        },
      },
    },
  }),
  useEnsName: () => ({
    data: 'name.eth',
  }),
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),

  useProvider: () => ({
    getNetwork: jest.fn(),
  }),
  chain: {
    mainnet: {},
  },
  useContractReads: () => ({
    data: [{}],
  }),
  chainId: {
    localhost: 1337,
  },
}));

const mockBigNumber = BigNumber.from(100000000);

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

describe('UpdateENSNameSummary', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <UpdateENSContentSummary decodedCall={mockDecodedCallUpdateENSContent} />
    );
    expect(container).toMatchSnapshot();
  });
});
