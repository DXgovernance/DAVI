import contenthash from 'content-hash';
import { MAINNET_ID, LOCALHOST_ID } from 'utils';
import { utils } from 'ethers';

const DEFAULT_NAMEHASH =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

const isValidNameHash = (
  name: string
): { isValid: boolean; validationError: string } => {
  let isValid = true;
  let validationError = null;

  if (!name) {
    validationError = 'Name cannot be empty';
    isValid = false;
    return { isValid, validationError };
  }

  let labelArray = name.split('.');

  let numberOfInvalidLabels = labelArray.filter(
    element => element.length === 0
  );
  if (numberOfInvalidLabels.length > 0) {
    validationError = 'Domain names have invalid length';
    isValid = false;
  }

  if (name.includes(' ')) {
    validationError = 'Domain name cannot include spaces';
    isValid = false;
  }

  if (labelArray.length > 3) {
    validationError =
      'Domain cannot be more than three levels deep (subdomain.domain.eth)';
    isValid = false;
  }

  return { isValid, validationError };
};

export const convertToNameHash = (
  name: string
): { nameHash: string; error: string } => {
  let error: string = null;
  let nameHash: string = null;

  if (!name) nameHash = DEFAULT_NAMEHASH;

  let { isValid, validationError } = isValidNameHash(name);

  if (!isValid) {
    error = validationError;
  } else {
    nameHash = utils.namehash(name);
  }

  return { nameHash, error };
};

export const convertToContentHash = (ipfsHash: string) => {
  if (!ipfsHash) {
    return '';
  }
  let result = contenthash.fromIpfs(ipfsHash);
  return `0x${result}`;
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
