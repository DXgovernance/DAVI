import { UseProposalVotesOfVoterReturn } from 'Modules/Guilds/Hooks/useProposalVotesOfVoter';

export interface ProposalCardActionsProps {
  votesOfVoters: UseProposalVotesOfVoterReturn;
  proposalCreator: string;
  userAddress: string;
}
