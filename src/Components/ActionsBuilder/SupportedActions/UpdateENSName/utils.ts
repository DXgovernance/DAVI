import namehash from 'eth-ens-namehash';
import contenthash from 'content-hash';
import { MAINNET_ID, LOCALHOST_ID } from 'utils';

export const convertToNameHash = (name: string) => namehash.hash(name);

export const convertToContentHash = (ipfsHash: string) =>
  contenthash.fromIpfs(ipfsHash);

export const convertToIPFSHash = (contentHash: string) => {
  if (!contentHash) return null;
  return contenthash.decode(contentHash);
};

export const getIpfsUrl = (ipfsHash: string) => {
  const ipfsRoot = 'ipfs://';
  return `${ipfsRoot}${ipfsHash}`;
};

export const isValidChainId = (chainId: number) => {
  if (!chainId || chainId === LOCALHOST_ID) {
    return MAINNET_ID;
  } else {
    return chainId;
  }
};
