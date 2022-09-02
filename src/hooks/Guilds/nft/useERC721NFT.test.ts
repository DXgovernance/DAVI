import useERC721NFT from './useERC721NFT';
import {
  MOCK_TOKEN_URI,
  MOCK_OWNER_ADDRESS,
  MOCK_CONTRACT_ADDRESS,
  MOCK_TOKEN_ID,
  MOCK_CHAIN_ID,
} from './fixtures';

jest.mock('wagmi', () => ({
  useContractReads: () => ({
    data: [MOCK_OWNER_ADDRESS, MOCK_TOKEN_URI],
    isError: false,
    isLoading: false,
  }),
}));

describe('useERC721NFT', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the owner address and the resolved token URI', () => {
    const { ownerAddress, resolvedTokenUri, isError, isLoading } = useERC721NFT(
      MOCK_CONTRACT_ADDRESS,
      MOCK_TOKEN_ID,
      MOCK_CHAIN_ID
    );
    expect(ownerAddress).toMatchInlineSnapshot(
      `"0x0000000000000000000000000000000000000000"`
    );
    expect(resolvedTokenUri).toMatchInlineSnapshot(
      `"https://example.com/token/1"`
    );
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
