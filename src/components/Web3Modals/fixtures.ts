import { ZERO_ADDRESS } from 'utils';
import { Chain } from 'wagmi';

export const mockChain: Chain = {
  id: 123456,
  name: 'Random Chain',
  network: 'random',
  rpcUrls: {
    default: 'http://localhost:8545',
  },
};

export const mockAccount = {
  address: ZERO_ADDRESS,
  isConnected: false,
  isConnecting: false,
  isDisconnected: false,
  isReconnecting: false,
  status: 'disconnected',
  connector: null,
};
