import { BigNumber } from 'ethers';
import { render } from 'utils/tests';
import { repMintEmptyDecodedCallMock } from './fixtures';
import { Mint } from './RepMintEditor';
const mockBigNumber = BigNumber.from(0);

jest.mock('hooks/Guilds/guild/useTotalSupply', () => ({
  useTotalSupply: () => ({
    parsedData: {
      toAddress: '0x0000000000000000000000000000000000000000',
      amount: mockBigNumber,
    },
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

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

describe('RepMintEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <Mint
        decodedCall={repMintEmptyDecodedCallMock}
        updateCall={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
