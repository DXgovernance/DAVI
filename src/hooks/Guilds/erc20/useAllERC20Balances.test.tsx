import { MOCK_WALLET_ADDRESS, MOCK_TOKEN_INFO } from './fixtures';
import { useAllERC20Balances } from './useAllERC20Balances';

jest.mock('./useAllERC20Balances', () => ({
  useAllERC20Balances: () => ({
    data: [MOCK_TOKEN_INFO],
    isError: false,
    isLoading: false,
  }),
}));

describe('useAllERC20Balances', () => {
  it('should return all ERC20 balances', () => {
    const { data, ...rest } = useAllERC20Balances(MOCK_WALLET_ADDRESS, true);
    expect(data).toMatchInlineSnapshot(`
      Array [
        Object {
          "address": "0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa",
          "balance": Object {
            "hex": "0x64",
            "type": "BigNumber",
          },
          "chainId": 1,
          "decimals": 0,
          "logoURI": "",
          "name": "WAGMI",
          "symbol": "WAG",
          "type": "ERC20",
        },
      ]
    `);
    expect(rest).toMatchInlineSnapshot(`
      Object {
        "isError": false,
        "isLoading": false,
      }
    `);
  });
});
