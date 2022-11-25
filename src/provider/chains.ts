import { chain, Chain } from 'wagmi';

const gnosisChain: Chain = {
  id: 100,
  name: 'Gnosis',
  network: 'gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'xDAI',
    symbol: 'DAI',
  },
  rpcUrls: {
    default:
      'https://poa-xdai-archival.gateway.pokt.network/v1/lb/dda01e253305bbeac6507a80',
  },
  blockExplorers: {
    default: { name: 'Gnosis', url: 'https://gnosisscan.io' },
  },
  testnet: false,
};

export const chains: Chain[] = [
  {
    ...chain.mainnet,
    rpcUrls: {
      default:
        'https://eth-mainnet.gateway.pokt.network/v1/lb/dda01e253305bbeac6507a80',
    },
  },
  chain.goerli,
  chain.arbitrum,
  chain.arbitrumRinkeby,
  gnosisChain,
];

if (process.env.NODE_ENV === 'development') {
  const localhost: Chain = {
    id: 1337,
    name: 'Localhost',
    network: 'localhost',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'http://127.0.0.1:8545',
    },
    blockExplorers: {
      default: { name: 'Ethernal', url: 'https://app.tryethernal.com' },
    },
    testnet: true,
  };

  chains.push(localhost);
}

export const getBlockExplorerUrl = (
  chain: Chain,
  address: string,
  type: 'address' | 'tx'
) => {
  if (!chain || !chain?.blockExplorers?.default) return null;

  return `${chain.blockExplorers.default.url}/${type}/${address}`;
};
