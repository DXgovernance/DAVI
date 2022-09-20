import { useERC20Info } from './useERC20Info';
import {
  MOCK_BIG_NUMBER,
  MOCK_CONTRACT_ADDRESS,
  MOCK_DECIMALS,
  MOCK_NAME,
  MOCK_SYMBOL,
} from './fixtures';

jest.mock('wagmi', () => ({
  useContractReads: () => ({
    data: [MOCK_NAME, MOCK_SYMBOL, MOCK_DECIMALS, MOCK_BIG_NUMBER],
    isError: false,
    isLoading: false,
  }),
}));

describe('useERC20Info', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return ERC20Info', () => {
    const { data, isError, isLoading } = useERC20Info(MOCK_CONTRACT_ADDRESS);
    expect(data).toMatchInlineSnapshot(`
    Object {
      "decimals": 0,
      "name": "WAGMI",
      "symbol": "WAG",
      "totalSupply": Object {
        "hex": "0x64",
        "type": "BigNumber",
      },
    }
  `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
