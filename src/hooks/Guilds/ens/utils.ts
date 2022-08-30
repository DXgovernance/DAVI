import { isSupportedChainId } from 'components/ActionsBuilder/SupportedActions/UpdateENSContent/utils';
import { MAINNET_ID, GOERLI_ID } from 'utils';

export const isAvailableOnENS = (chainId: number) => {
  const validChainId = isSupportedChainId(chainId);
  const ensNetworks = [MAINNET_ID, GOERLI_ID];
  return ensNetworks.includes(validChainId);
};
