import * as ENSPublicResolverContract from './useENSPublicResolverContract';

jest.mock('wagmi', () => ({
  useEnsResolver: () => ({
    data: {
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
  useContractRead: () => ({
    data: {},
  }),
}));

describe('useENSContentHash', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the ipfs hash from the ens name', () => {
    jest
      .spyOn(ENSPublicResolverContract, 'useENSContentHash')
      .mockImplementation(() => ({
        ipfsHash: 'QmfGgQYwL4ZrXLVshYuwH2WHeSvPFQCDXeYTzPPFReCJqJ',
        isLoading: false,
        isError: false,
      }));
    const { ipfsHash } =
      ENSPublicResolverContract.useENSContentHash('wagmi.eth');
    expect(ipfsHash).toMatchInlineSnapshot(
      `"QmfGgQYwL4ZrXLVshYuwH2WHeSvPFQCDXeYTzPPFReCJqJ"`
    );
  });

  it('should return the avatar URI from the ens name', () => {
    jest
      .spyOn(ENSPublicResolverContract, 'useENSAvatarUri')
      .mockImplementation(() => ({
        avatarUri: 'https://',
        isError: false,
        isLoading: false,
      }));
    const { avatarUri } =
      ENSPublicResolverContract.useENSAvatarUri('wagmi.eth');
    expect(avatarUri).toMatchInlineSnapshot(`"https://"`);
  });
});
