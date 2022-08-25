import NetworkButton from './NetworkButton';
import { render } from 'utils/tests';
import wagmi from 'wagmi';
import { mockAccount, mockChain } from 'components/Web3Modals/fixtures';

jest.mock('wagmi', () => ({
  useAccount: () => ({ isConnected: false }),
  useNetwork: () => ({ chain: {}, chains: [] }),
  useSwitchNetwork: () => ({ switchNetwork: jest.fn() }),
}));

describe('NetworkButton', () => {
  it('Should match snapshot and display not connected status', () => {
    const { container, getByText } = render(<NetworkButton />);
    expect(container).toMatchSnapshot();
    expect(getByText('notConnected')).toBeInTheDocument();
  });

  it('Should match snapshot and display network', () => {
    jest
      .spyOn(wagmi, 'useAccount')
      .mockImplementation(() => ({ ...mockAccount, isConnected: true } as any));
    jest
      .spyOn(wagmi, 'useNetwork')
      .mockImplementation(() => ({ chain: mockChain, chains: [mockChain] }));

    const { container, getByText } = render(<NetworkButton />);
    expect(container).toMatchSnapshot();
    expect(getByText(mockChain.name)).toBeInTheDocument();
  });
});
