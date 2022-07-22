import {
  convertToNameHash,
  convertToContentHash,
  convertToIPFSHash,
  isValidChainId,
} from './utils';

describe.skip('utils', () => {
  it('should convert to namehash', () => {
    expect(convertToNameHash('name')).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000007e'
    );
  });

  it('should convert to IPFS hash', () => {
    expect(convertToIPFSHash('Qm')).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000007e'
    );
  });

  it('should convert to content hash', () => {
    expect(convertToContentHash('Qm')).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000007e'
    );
  });

  it('should convert to valid chain ID', () => {
    expect(isValidChainId(1)).toEqual(1);
  });
});
