import TransactionModal from './TransactionModal';
import { render } from 'utils/tests';

jest.mock('provider/connectors', () => {
  return {
    getChains: () => {
      return [
        {
          id: 1,
          name: 'mainnet',
          displayName: 'Ethereum Mainnet',
          defaultRpc: 'https://eth-mainnet.alchemyapi.io/v2/',
          nativeAsset: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
          },
          blockExplorer: 'https://etherscan.io',
          api: 'https://api.etherscan.io',
        },
      ];
    },
  };
});

describe.skip('TransactionModal', () => {
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
