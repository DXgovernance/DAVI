import { UseProposalVotesOfVoterReturn } from 'Modules/Guilds/Hooks/useProposalVotesOfVoter';

export interface ProposalCardActionsProps {
  votesOfVoter: UseProposalVotesOfVoterReturn;
  proposalCreator: string;
  userAddress: string;
}
