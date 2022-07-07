import NetworkButton from './NetworkButton';
import { render } from 'utils/tests';

describe.skip('NetworkButton', () => {
  it('Should match snapshot and display not connected status', () => {
    const { container, getByText } = render(<NetworkButton />);
    expect(container).toMatchSnapshot();
    expect(getByText('notConnected')).toBeInTheDocument();
  });
  it('Should match snapshot and display network', () => {
    const { container, getByText } = render(<NetworkButton />);
    expect(container).toMatchSnapshot();
    expect(getByText('Ethereum Mainnet')).toBeInTheDocument();
  });
});
