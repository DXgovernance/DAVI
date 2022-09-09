import useERC1155NFT from './useERC1155NFT';
import {
  MOCK_TOKEN_ID,
  MOCK_CONTRACT_ADDRESS,
  MOCK_OWNER_ADDRESS,
  MOCK_CHAIN_ID,
  MOCK_BALANCE,
  MOCK_TOKEN_URI,
} from './fixtures';

jest.mock('wagmi', () => ({
  useContractReads: () => ({
    data: [MOCK_BALANCE, MOCK_TOKEN_URI],
    isError: false,
    isLoading: false,
  }),
}));

describe('useERC1155NFT', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the balance and the resolved token URI', () => {
    const { balance, resolvedTokenUri, isError, isLoading } = useERC1155NFT(
      MOCK_CONTRACT_ADDRESS,
      MOCK_TOKEN_ID,
      MOCK_OWNER_ADDRESS,
      MOCK_CHAIN_ID
    );
    expect(balance).toMatchInlineSnapshot(`
      Object {
        "hex": "0x64",
        "type": "BigNumber",
      }
    `);
    expect(resolvedTokenUri).toMatchInlineSnapshot(
      `"https://example.com/token/1"`
    );
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
