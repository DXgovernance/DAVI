import { useERC20Balance } from './useERC20Balance';
import {
  MOCK_WALLET_ADDRESS,
  MOCK_CONTRACT_ADDRESS,
  MOCK_BIG_NUMBER,
} from './fixtures';

jest.mock('wagmi', () => ({
  useContractRead: () => ({
    data: MOCK_BIG_NUMBER,
    isError: false,
    isLoading: false,
  }),
  useContractEvent: () => jest.fn(),
}));

describe('useERC20Balance', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return ERC20Balance as BigNumber', () => {
    const { data, isError, isLoading } = useERC20Balance(
      MOCK_WALLET_ADDRESS,
      MOCK_CONTRACT_ADDRESS
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
