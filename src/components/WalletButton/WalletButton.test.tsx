import WalletButton from './WalletButton';
import { render } from 'utils/tests';
import { ZERO_ADDRESS } from 'utils';
import wagmi from 'wagmi';

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
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

jest.mock('provider/ReadOnlyConnector', () => ({
  READ_ONLY_CONNECTOR_ID: 'readOnly',
}));

const mockAddress = ZERO_ADDRESS;
const mockChainId = 123456;

jest.mock('wagmi', () => ({
  chain: {},
  useAccount: () => jest.fn(),
  useNetwork: () => ({ chain: { id: mockChainId } }),
  useSwitchNetwork: () => ({ switchNetwork: jest.fn() }),
  useConnect: () => ({ connect: jest.fn(), connectors: [] }),
  useDisconnect: () => ({ disconnect: jest.fn() }),
}));

jest.mock('provider', () => ({
  getBlockExplorerUrl: () => null,
}));

jest.mock('provider/wallets', () => ({
  isReadOnly: () => false,
}));

describe('WalletButton', () => {
  it('Should match snapshot and display connect wallet', () => {
    jest
      .spyOn(wagmi, 'useAccount')
      .mockImplementation(() => ({ isConnected: false } as any));

    const { container, getByText } = render(<WalletButton />);
    expect(container).toMatchSnapshot();
    expect(getByText('connectWallet')).toBeInTheDocument();
  });
  it('Should match snapshot and display connected address', () => {
    jest.spyOn(wagmi, 'useAccount').mockImplementation(
      () =>
        ({
          isConnected: true,
          address: mockAddress,
          connector: { id: 'notReadOnly' },
        } as any)
    );

    const { container, getByText } = render(<WalletButton />);
    expect(container).toMatchSnapshot();
    expect(getByText('test.eth')).toBeInTheDocument();
  });
});
