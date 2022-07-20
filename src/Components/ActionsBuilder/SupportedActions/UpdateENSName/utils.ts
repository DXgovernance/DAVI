import namehash from 'eth-ens-namehash';
import contenthash from 'content-hash';
import { useState, useEffect } from 'react';

export const convertToNameHash = (name: string) => namehash.hash(name);

export const convertToContentHash = (ipfsHash: string) =>
  contenthash.fromIpfs(ipfsHash);

export const convertToIPFSHash = (contentHash: string) => {
  if (!contentHash) return null;
  return contenthash.decode(contentHash);
};

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
