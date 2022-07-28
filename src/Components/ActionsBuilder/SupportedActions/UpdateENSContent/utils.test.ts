import { GOERLI_ID, LOCALHOST_ID } from 'utils';
import {
  convertToNameHash,
  convertToContentHash,
  convertToIpfsHash,
  isValidChainId,
  getIpfsUrl,
} from './utils';

describe('utils', () => {
  describe('convertToNameHash', () => {
    it('should convert to namehash', () => {
      const name = 'test.eth';
      const namehash = convertToNameHash(name);
      expect(namehash).toMatchInlineSnapshot(
        `"0xeb4f647bea6caa36333c816d7b46fdcb05f9466ecacc140ea8c66faf15b3d9f1"`
      );
    });
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
        `"e3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f"`
      );
    });
  });

  describe('isValidChainId', () => {
    it('should convert to valid chain ID', () => {
      expect(isValidChainId(GOERLI_ID)).toEqual(5);
    });
    it('should convert localhost ID to the mainnet ID', () => {
      expect(isValidChainId(LOCALHOST_ID)).toEqual(1);
    });
  });
});

describe('getIpfsUrl', () => {
  it('should return the correct url', () => {
    expect(getIpfsUrl('Qm')).toEqual('ipfs://Qm');
  });
});
