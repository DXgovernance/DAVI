import { GOERLI_ID, LOCALHOST_ID } from 'utils';
import {
  convertToNameHash,
  convertToContentHash,
  convertToIpfsHash,
  isSupportedChainId,
  getIpfsUrl,
} from './utils';

describe('utils', () => {
  describe('convertToNameHash', () => {
    it('should convert to namehash', () => {
      const name = 'test.eth';
      const { nameHash } = convertToNameHash(name);
      expect(nameHash).toMatchInlineSnapshot(
        `"0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"`
      );
    });

    it(`should return a namehash for subdomains`, () => {});

    it(`should return an error if there's a subdomain with no letters on it (two dots together)`, () => {});

    it(`should return an error if the domain has spaces`, () => {});
  });

  describe('convertToContentHash', () => {
    it('should convert to IPFS hash', () => {
      const contentHash =
        'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be';
      expect(convertToIpfsHash(contentHash)).toMatchInlineSnapshot(
        `"QmdTPkMMBWQvL8t7yXogo7jq5pAcWg8J7RkLrDsWZHT82y"`
      );
    });
  });

  describe('convertToIpfsHash', () => {
    const ipfsHash = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';
    it('should convert to content hash', () => {
      expect(convertToContentHash(ipfsHash)).toMatchInlineSnapshot(
        `"0xe3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f"`
      );
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
