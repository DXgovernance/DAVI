import useTotalSupplyAt from 'Modules/Guilds/Hooks/useTotalSupplyAt';
import {
  MOCK_BIG_NUMBER,
  MOCK_CONTRACT_ADDRESS,
  MOCK_SNAPSHOT_ID,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useTotalSupplyAt', () => ({
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
