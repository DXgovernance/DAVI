import useCurrentSnapshotId from 'Modules/Guilds/Hooks/useCurrentSnapshotId';
import {
  MOCK_CONTRACT_ADDRESS,
  MOCK_SNAPSHOT_ID,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useCurrentSnapshotId', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_SNAPSHOT_ID,
    isError: false,
    isLoading: false,
  }),
}));

describe('useCurrentSnapshotId', () => {
  it('should return current snapshot id', () => {
    const { data, isError, isLoading } = useCurrentSnapshotId({
      contractAddress: MOCK_CONTRACT_ADDRESS,
    });
    expect(data).toMatchInlineSnapshot(`1`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
