import { WalletModal } from './WalletModal';
import { render } from 'utils/tests';
import { mockChain } from '../fixtures';

jest.mock('contexts/Guilds', () => ({
  useTransactions: () => [],
}));

jest.mock('provider/ReadOnlyConnector', () => ({
  READ_ONLY_CONNECTOR_ID: 'readOnly',
}));

jest.mock('wagmi', () => ({
  chain: {},
  useAccount: () => ({ isConnected: true }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
  useSwitchNetwork: () => ({ switchNetwork: jest.fn() }),
  useConnect: () => ({ connect: jest.fn(), connectors: [] }),
  useDisconnect: () => ({ disconnect: jest.fn() }),
}));

describe('WalletModal', () => {
  it('Should match snapshot', () => {
    console.error = jest.fn();
    const { container } = render(
      <WalletModal isOpen={true} onClose={() => jest.fn()} />,
      {
        container: document.body,
      }
    );
    expect(container).toMatchSnapshot();
  });
});
