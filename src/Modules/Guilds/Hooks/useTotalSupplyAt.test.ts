import useTotalSupplyAt from './useTotalSupplyAt';
import {
  MOCK_BIG_NUMBER,
  MOCK_CONTRACT_ADDRESS,
  MOCK_SNAPSHOT_ID,
} from './fixtures';
jest.mock('./useTotalSupplyAt', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_BIG_NUMBER,
    isError: false,
    isLoading: false,
  }),
}));

describe('useTotalSupplyAt', () => {
  it('should return total supply at snapshot id', () => {
    const { data, isError, isLoading } = useTotalSupplyAt({
      contractAddress: MOCK_CONTRACT_ADDRESS,
      snapshotId: MOCK_SNAPSHOT_ID.toString(),
    });
    expect(data).toMatchInlineSnapshot(`
      Object {
        "hex": "0x01",
        "type": "BigNumber",
      }
    `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
