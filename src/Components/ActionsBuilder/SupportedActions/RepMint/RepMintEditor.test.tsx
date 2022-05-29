import { screen } from '@testing-library/react';
import { BigNumber } from 'ethers';
import { render } from '../../../../utils/tests';
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

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

describe('RepMintEditor', () => {
  beforeAll(() => {
    render(
      <Mint decodedCall={repMintEmptyDecodedCallMock} updateCall={jest.fn()} />
    );
  });
  it('renders', () => {
    expect(screen.getByText('Recipient')).toBeInTheDocument();
    expect(screen.getByText('Reputation in %')).toBeInTheDocument();
    expect(screen.getByText('Reputation Amount')).toBeInTheDocument();
  });
});
