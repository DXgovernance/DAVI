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
  useAccount: () => ({ isConnected: true, connector: 'test' }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
  useSwitchNetwork: () => ({ switchNetwork: jest.fn() }),
  useConnect: () => ({ connect: jest.fn(), connectors: [] }),
  useDisconnect: () => ({ disconnect: jest.fn() }),
  useEnsName: () => ({
    data: 'name.eth',
  }),
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
  useContractReads: () => ({ data: [] }),
}));

jest.mock('provider', () => ({
  getBlockExplorerUrl: () => null,
}));

jest.mock('provider/wallets', () => ({
  isReadOnly: () => true,
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
