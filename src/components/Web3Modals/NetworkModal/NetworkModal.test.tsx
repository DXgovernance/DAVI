import NetworkModal from './NetworkModal';
import { render } from 'utils/tests';
import { mockChain } from '../fixtures';

jest.mock('wagmi', () => ({
  useAccount: () => ({ isConnected: true }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
  useSwitchNetwork: () => ({ switchNetwork: jest.fn() }),
}));

describe('NetworkModal', () => {
  it('Should match snapshot', () => {
    console.error = jest.fn();
    const { container } = render(
      <NetworkModal isOpen={true} onClose={() => jest.fn()} />,
      {
        container: document.body,
      }
    );
    expect(container).toMatchSnapshot();
  });
  it('Should display chains', () => {
    const { getByText } = render(
      <NetworkModal isOpen={true} onClose={() => jest.fn()} />,
      {
        container: document.body,
      }
    );
    expect(getByText(mockChain.name)).toBeInTheDocument();
  });
});
