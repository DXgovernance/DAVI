import useVotingPowerOfAt from './useVotingPowerOfAt';
import {
  MOCK_BIG_NUMBER,
  MOCK_CONTRACT_ADDRESS,
  MOCK_SNAPSHOT_ID,
  MOCK_USER_ADDRESS,
} from './fixtures';
jest.mock('./useVotingPowerOfAt', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_BIG_NUMBER,
    isError: false,
    isLoading: false,
  }),
}));

describe('useVotingPowerOfAt', () => {
  it('should return the voting power of at snapshot id', () => {
    const { data, isError, isLoading } = useVotingPowerOfAt({
      contractAddress: MOCK_CONTRACT_ADDRESS,
      userAddress: MOCK_USER_ADDRESS,
      snapshotId: MOCK_SNAPSHOT_ID.toString(),
      fallbackSnapshotId: true,
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
