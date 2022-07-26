import namehash from 'eth-ens-namehash';
import contenthash from 'content-hash';
import {
  MAINNET_ID,
  LOCALHOST_ID,
  GOERLI_ID,
  ARBITRUM_ID,
  ARBITRUM_TESTNET_ID,
} from 'utils';

export const convertToNameHash = (name: string) => namehash.hash(name);

export const convertToContentHash = (ipfsHash: string) =>
  contenthash.fromIpfs(ipfsHash);

export const convertToIpfsHash = (contentHash: string) => {
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

export const getBlockChainUrl = (chainId: number, address: string) => {
  switch (chainId) {
    case LOCALHOST_ID:
    case MAINNET_ID:
      return `https://etherscan.io/address/${address}`;
    case ARBITRUM_ID:
      return `https://arbitrum.io/address/${address}`;
    case ARBITRUM_TESTNET_ID:
      return `https://arbitrum.io/testnet/address/${address}`;
    case GOERLI_ID:
      return `https://goerli.etherscan.io/address/${address}`;
    default:
      throw Error(`The chainId or address is not supported`);
  }
};
