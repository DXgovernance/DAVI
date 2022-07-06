import { ChainProviderFn } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const ALCHEMY_KEY = '7i7fiiOx1b7bGmgWY_oI9twyQBCsuXKC';

const POKT_NETWORK_URLS = {
  '1': 'https://eth-mainnet.gateway.pokt.network/v1/lb/61f86d630d66d80038fb8c38',
  '5': 'https://eth-goerli.gateway.pokt.network/v1/lb/6229f9b8abc11f0039cb2d2c',
  '100':
    'https://gnosischain-mainnet.gateway.pokt.network/v1/lb/61d897d4a065f5003a113d9a',
};

const pokt = jsonRpcProvider({
  rpc(chain) {
    return POKT_NETWORK_URLS[chain.id] ?? null;
  },
  priority: 1,
});

const alchemy = alchemyProvider({ alchemyId: ALCHEMY_KEY, priority: 2 });

const fallback = publicProvider({ priority: 3 });

export const providers: ChainProviderFn[] = [pokt, alchemy, fallback];
