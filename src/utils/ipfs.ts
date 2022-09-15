import contenthash from 'content-hash';
import { MAINNET_ID, LOCALHOST_ID } from 'utils';
import { utils } from 'ethers';
import { isEnsName, isIpfsHash } from './validations';

export const convertToNameHash = (
  name: string
): { nameHash: string; error: string } => {
  let error: string = null;
  let nameHash: string = null;

  const { isValid, validationError } = isEnsName(name);

  if (!isValid) error = validationError;
  else nameHash = utils.namehash(name);

  return { nameHash, error };
};

export const convertToContentHash = (ipfsHash: string) => {
  let error: string = null;
  let contentHash: string = null;

  const { isValid, validationError } = isIpfsHash(ipfsHash);

  if (!isValid) error = validationError;
  else contentHash = `0x${contenthash.fromIpfs(ipfsHash)}`;

  return { contentHash, error };
};

export const convertToIpfsHash = (contentHash: string) => {
  if (!contentHash) return null;
  return contenthash.decode(contentHash);
};

export const getIpfsUrl = (ipfsHash: string) => {
  const ipfsRoot = 'ipfs://';
  return ipfsHash ? `${ipfsRoot}${ipfsHash}` : null;
};

export const isSupportedChainId = (chainId: number) => {
  if (!chainId || chainId === LOCALHOST_ID) {
    return MAINNET_ID;
  } else {
    return chainId;
  }
};
