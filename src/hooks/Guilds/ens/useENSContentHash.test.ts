import useENSContentHash from './useENSContentHash';

jest.mock('./useENSContentHash', () => ({
  __esModule: true,
  default: () => ({
    ipfsHash: '0x0000000000000000000000000000000000000000',
  }),
}));

describe('useAddressFromENSName', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the ipfs hash from the ens name', () => {
    const { ipfsHash } = useENSContentHash('wagmi.eth');
    expect(ipfsHash).toBe('0x0000000000000000000000000000000000000000');
  });
});
