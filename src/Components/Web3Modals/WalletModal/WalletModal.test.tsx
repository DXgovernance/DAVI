import WalletModal from './WalletModal';
import { render } from 'utils/tests';

jest.mock('contexts/index', () => jest.fn());

jest.mock('contexts/Guilds', () => ({
  useTransactions: () => [],
}));

jest.mock('provider/providerHooks', () => ({
  useRpcUrls: () => jest.fn(),
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
