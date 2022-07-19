import namehash from 'eth-ens-namehash';
import contenthash from 'content-hash';

export const convertToNameHash = (name: string) => namehash.hash(name);
export const convertToContentHash = (ipfsHash: string) =>
  contenthash.fromIpfs(ipfsHash);
