import type { VoteData } from 'Modules/Guilds/Hooks/useVotingResults';
import { UseProposalVotesOfVoterReturn } from 'Modules/Guilds/Hooks/useProposalVotesOfVoter';

export interface UserVoteProps {
  votedOptionLabel: string;
  voteData: VoteData;
  isPercent: boolean;
  userVote: UseProposalVotesOfVoterReturn;
}
