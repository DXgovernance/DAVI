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
