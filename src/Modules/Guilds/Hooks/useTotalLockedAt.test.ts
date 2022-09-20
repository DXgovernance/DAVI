import useTotalLockedAt from 'Modules/Guilds/Hooks/useTotalLockedAt';
import {
  MOCK_CONTRACT_ADDRESS,
  MOCK_SNAPSHOT_ID,
  MOCK_TOTAL_LOCKED_AT,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useTotalLockedAt', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_TOTAL_LOCKED_AT,
    isError: false,
    isLoading: false,
  }),
}));

describe('useTotalLockedAt', () => {
  it('should return total locked at amount at snapshot id', () => {
    const { data, isError, isLoading } = useTotalLockedAt({
      contractAddress: MOCK_CONTRACT_ADDRESS,
      snapshotId: MOCK_SNAPSHOT_ID.toString(),
    });
    expect(data).toMatchInlineSnapshot(`1`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
