import * as ENSPublicResolverContract from './useENSPublicResolverContract';
import {
  MOCK_ADDRESS,
  MOCK_ENS_NAME,
  MOCK_IPFS_HASH,
  MOCK_AVATAR_URI,
} from './fixtures';

jest.mock('wagmi', () => ({
  useEnsResolver: () => ({
    data: {
      address: MOCK_ADDRESS,
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
        ipfsHash: MOCK_IPFS_HASH,
        isLoading: false,
        isError: false,
      }));
    const { ipfsHash } =
      ENSPublicResolverContract.useENSContentHash(MOCK_ENS_NAME);
    expect(ipfsHash).toMatchInlineSnapshot(
      `"QmfGgQYwL4ZrXLVshYuwH2WHeSvPFQCDXeYTzPPFReCJqJ"`
    );
  });

  it('should return the avatar URI from the ens name', () => {
    jest
      .spyOn(ENSPublicResolverContract, 'useENSAvatarUri')
      .mockImplementation(() => ({
        avatarUri: MOCK_AVATAR_URI,
        isError: false,
        isLoading: false,
      }));
    const { avatarUri } =
      ENSPublicResolverContract.useENSAvatarUri(MOCK_ENS_NAME);
    expect(avatarUri).toMatchInlineSnapshot(`"https://"`);
  });
});
