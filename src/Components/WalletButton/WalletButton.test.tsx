import WalletButton from './WalletButton';
import { render } from 'utils/tests';
import { ANY_ADDRESS, shortenAddress } from 'utils';

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

jest.mock('contexts/Guilds', () => {
  return {
    useTransactions: () => {
      return [];
    },
  };
});

describe.skip('WalletButton', () => {
  it('Should match snapshot and display connect wallet', () => {
    const { container, getByText } = render(<WalletButton />);
    expect(container).toMatchSnapshot();
    expect(getByText('connectWallet')).toBeInTheDocument();
  });
  it('Should match snapshot and display connected address', () => {
    const { container, getByText } = render(<WalletButton />);
    expect(container).toMatchSnapshot();
    expect(getByText(shortenAddress(ANY_ADDRESS))).toBeInTheDocument();
  });
});
