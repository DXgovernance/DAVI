import { render } from 'utils/tests';
import ProposalVoteCard from './ProposalVoteCard';
import { mockProposalVoteCardProps } from './fixture';

describe('ProposalVoteCard', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <ProposalVoteCard {...mockProposalVoteCardProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
