import { render } from 'utils/tests';
import ProposalVoteCard from './ProposalVoteCard';
import { mockProposalVoteCardProps } from './mocks';

describe('ProposalVoteCard', () => {
  it.only('renders', () => {
    render(<ProposalVoteCard {...mockProposalVoteCardProps} />);
  });
});
