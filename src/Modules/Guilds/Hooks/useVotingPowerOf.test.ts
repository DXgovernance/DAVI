import { useVotingPowerOf } from 'Modules/Guilds/Hooks/useVotingPowerOf';
import {
  MOCK_BIG_NUMBER,
  MOCK_CONTRACT_ADDRESS,
  MOCK_SNAPSHOT_ID,
  MOCK_USER_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useVotingPowerOf', () => ({
  useVotingPowerOf: () => ({
    data: MOCK_BIG_NUMBER,
    isError: false,
    isLoading: false,
  }),
}));

describe('useVotingPowerOf', () => {
  it('should return the voting power for user', () => {
    const { data, isError, isLoading } = useVotingPowerOf({
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
