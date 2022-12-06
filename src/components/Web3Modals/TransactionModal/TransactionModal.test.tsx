import TransactionModal from './TransactionModal';
import { render } from 'utils/tests';
import { mockChain } from '../fixtures';

jest.mock('provider/ReadOnlyConnector', () => ({
  READ_ONLY_CONNECTOR_ID: 'readOnly',
}));

jest.mock('wagmi', () => ({
  chain: {},
  useNetwork: () => ({ chain: mockChain }),
}));

jest.mock('provider', () => ({
  getBlockExplorerUrl: () => jest.fn(),
}));

describe('TransactionModal', () => {
  it('Should match snapshot', () => {
    console.error = jest.fn();
    const { container } = render(
      <TransactionModal
        message="test"
        transactionHash={'0x123456789'}
        txCancelled={false}
        onCancel={() => jest.fn()}
      />,
      {
        container: document.body,
      }
    );
    expect(container).toMatchSnapshot();
  });
});
