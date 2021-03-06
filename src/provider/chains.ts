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
      'https://poa-xdai-archival.gateway.pokt.network/v1/lb/61d897d4a065f5003a113d9a',
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout.com/xdai/mainnet' },
  },
  testnet: false,
};

export const chains: Chain[] = [
  chain.mainnet,
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
