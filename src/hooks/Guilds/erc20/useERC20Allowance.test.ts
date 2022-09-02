import { useERC20Allowance } from './useERC20Allowance';
import {
  MOCK_BIG_NUMBER,
  MOCK_CONTRACT_ADDRESS,
  MOCK_SPENDER_ADDRESS,
  MOCK_WALLET_ADDRESS,
} from './fixtures';

jest.mock('wagmi', () => ({
  useContractRead: () => ({
    data: MOCK_BIG_NUMBER,
    isError: false,
    isLoading: false,
  }),
}));

describe('useERC20Allowance', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the allowance', () => {
    const { data, isError, isLoading } = useERC20Allowance(
      MOCK_CONTRACT_ADDRESS,
      MOCK_WALLET_ADDRESS,
      MOCK_SPENDER_ADDRESS
    );
    expect(data).toMatchInlineSnapshot(`
      Object {
        "hex": "0x64",
        "type": "BigNumber",
      }
    `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
