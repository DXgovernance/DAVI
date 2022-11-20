import Header from './Header';
import { render } from 'utils/tests';
import { mockChain } from 'components/Web3Modals/fixtures';

jest.mock('contexts/Guilds/orbis', () => ({}));

jest.mock('wagmi', () => ({
  chain: {},
  useAccount: () => ({ isConnected: false }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
  useSwitchNetwork: () => ({ switchNetwork: jest.fn() }),
  useConnect: () => ({ connect: jest.fn(), connectors: [] }),
  useDisconnect: () => ({ disconnect: jest.fn() }),
}));

jest.mock('provider/ReadOnlyConnector', () => ({
  READ_ONLY_CONNECTOR_ID: 'readOnly',
}));

jest.mock('contexts/Guilds/transactions', () => ({
  useTransactions: () => ({ transactions: [] }),
}));

describe('Header', () => {
  it('Should match snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
