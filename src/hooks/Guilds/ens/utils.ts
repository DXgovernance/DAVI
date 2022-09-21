import { GOERLI_ID, LOCALHOST_ID, MAINNET_ID } from 'utils';

export const isAvailableOnENS = (chainId: number) => {
  const ensNetworks = [MAINNET_ID, GOERLI_ID, LOCALHOST_ID];
  return ensNetworks.includes(chainId);
};
