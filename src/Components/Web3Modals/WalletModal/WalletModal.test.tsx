import WalletModal from './WalletModal';
import { render } from 'utils/tests';

jest.mock('contexts/Guilds', () => ({
  useTransactions: () => [],
}));

describe('WalletModal', () => {
  it.skip('Should match snapshot', () => {
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
