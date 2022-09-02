import { useProposalVotes } from './useProposalVotes';
import {
  MOCK_GUILD_ADDRESS,
  MOCK_PROPOSAL_ID,
  MOCK_PROPOSAL_VOTES,
} from './fixtures';
jest.mock('./useProposalVotes', () => ({
  useProposalVotes: () => ({
    data: MOCK_PROPOSAL_VOTES,
    isError: false,
    isLoading: false,
  }),
}));

describe('useProposalVotes', () => {
  it('should return proposal votes', () => {
    const { data, isError, isLoading } = useProposalVotes(
      MOCK_GUILD_ADDRESS,
      MOCK_PROPOSAL_ID
    );
    expect(data).toMatchInlineSnapshot(`1`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
