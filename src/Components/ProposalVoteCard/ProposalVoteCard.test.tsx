import { render } from 'utils/tests';
import ProposalVoteCard from './ProposalVoteCard';
import { mockProposalVoteCardProps } from './mocks';

describe('ProposalVoteCard', () => {
  it.only('renders', () => {
    const { container } = render(
      <ProposalVoteCard {...mockProposalVoteCardProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
