import { getNetworkById } from 'utils';
import { useNetwork } from 'wagmi';

const configs = {
  arbitrum: require('configs/arbitrum/config.json'),
  arbitrumTestnet: require('configs/arbitrumTestnet/config.json'),
  mainnet: require('configs/mainnet/config.json'),
  xdai: require('configs/xdai/config.json'),
  goerli: require('configs/goerli/config.json'),
  localhost: require('configs/localhost/config.json'),
};

const useNetworkConfig = (chainId?: number): NetworkConfig => {
  const { chain } = useNetwork();

  return configs[getNetworkById(chainId || chain?.id)?.name ?? 'mainnet'];
};

export default useNetworkConfig;
