import { isEnsName, isIpfsHash } from './validation';

describe('validation', () => {
  it('should be a correct ENS name', () => {
    expect(isEnsName('name')).toEqual(true);
  });

  it('should be a correct IPFS hash', () => {
    const ipfsHash = 'QmdTPkMMBWQvL8t7yXogo7jq5pAcWg8J7RkLrDsWZHT82y';
    expect(isIpfsHash(ipfsHash)).toEqual(true);
  });
});
