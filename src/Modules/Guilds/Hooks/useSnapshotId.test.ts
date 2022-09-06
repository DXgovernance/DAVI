import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import {
  MOCK_CONTRACT_ADDRESS,
  MOCK_PROPOSAL_ID,
  MOCK_SNAPSHOT_ID,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useSnapshotId', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_SNAPSHOT_ID,
    isError: false,
    isLoading: false,
  }),
}));

describe('useSnapshotId', () => {
  it('should return proposal snapshot ID', () => {
    const { data, isError, isLoading } = useSnapshotId({
      contractAddress: MOCK_CONTRACT_ADDRESS,
      proposalId: MOCK_PROPOSAL_ID,
    });
    expect(data).toMatchInlineSnapshot(`1`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
