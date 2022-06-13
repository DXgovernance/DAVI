import { render } from 'utils/tests';
import ProposalVoteCard from './ProposalVoteCard';
import { mockProposalVoteCardProps } from './fixture';

jest.mock('contexts/index', () => jest.fn());

describe('ProposalVoteCard', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <ProposalVoteCard {...mockProposalVoteCardProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
