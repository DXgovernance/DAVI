import NetworkModal from './NetworkModal';
import { render } from 'utils/tests';

jest.mock('contexts/index', () => jest.fn());

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

jest.mock('provider/providerHooks', () => {
  return {
    useRpcUrls: () => jest.fn(),
  };
});

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
    expect(getByText('Ethereum Mainnet')).toBeInTheDocument();
  });
});
