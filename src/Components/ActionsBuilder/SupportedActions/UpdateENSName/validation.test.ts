import { isEnsName, isIPFSHash } from './validation';

describe('validation', () => {
  it('should be a correct ENS name', () => {
    expect(isEnsName('name')).toEqual(true);
  });

  it('should be a correct IPFS hash', () => {
    expect(isIPFSHash('Qm')).toEqual(true);
  });
});
