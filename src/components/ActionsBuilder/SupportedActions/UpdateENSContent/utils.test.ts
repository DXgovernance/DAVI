import { GOERLI_ID, LOCALHOST_ID } from 'utils';
import {
  convertToNameHash,
  convertToContentHash,
  isSupportedChainId,
  getIpfsUrl,
  convertToIpfsHash,
} from './utils';

jest.mock('i18next', () => {
  return {
    t: (key: string) => key,
  };
});

describe('utils', () => {
  describe('convertToNameHash', () => {
    it('should convert to namehash', () => {
      const name = 'test.eth';
      const { nameHash } = convertToNameHash(name);
      expect(nameHash).toBe(
        '0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1'
      );
    });

    it(`should return a namehash for subdomains`, () => {
      const name = 'subdomain.test.eth';
      const { nameHash } = convertToNameHash(name);
      expect(nameHash).toBe(
        '0x8ff0886bcef88e45c53b2811a4eef521200ce49147fc76ed9fe7fa3272b0d5d7'
      );
    });

    it(`should return null namehash if there is an error`, () => {
      const name = 'test..eth';
      const { nameHash } = convertToNameHash(name);

      expect(nameHash).toBeNull();
    });
  });

  describe('convertToContentHash', () => {
    it('should return an error if the IPFS hash is invalid', () => {
      let ipfsHash = 'QmInvalidIPFSHash';
      const { hash, error } = convertToContentHash(ipfsHash);

      expect(hash).toBeNull();
      expect(error).toBe('ens.validation.ipfsHashNotValid');
    });
  });

  describe('convertToIpfsHash', () => {
    it('should convert contentHash to IPFS hash', () => {
      let ipfsHash = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';
      let contentHash =
        '0xe3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f';
      const hash = convertToIpfsHash(contentHash);
      expect(hash).toBe(ipfsHash);
    });
  });

  describe('isSupportedChainId', () => {
    it('should convert to valid chain ID', () => {
      expect(isSupportedChainId(GOERLI_ID)).toEqual(5);
    });
    it('should convert localhost ID to the mainnet ID', () => {
      expect(isSupportedChainId(LOCALHOST_ID)).toEqual(1);
    });
  });
});

describe('getIpfsUrl', () => {
  it('should return the correct url', () => {
    expect(getIpfsUrl('Qm')).toEqual('ipfs://Qm');
  });
});
