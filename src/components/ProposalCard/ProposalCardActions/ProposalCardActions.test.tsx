import ProposalCardActions from './ProposalCardActions';
import { render } from 'utils/tests';
import { mockProposalCardActionsProps } from './fixtures';

describe('ProposalCardActions', () => {
  it('renders properly and shows two icons if you have created the proposal and voted', () => {
    const { container } = render(
      <ProposalCardActions {...mockProposalCardActionsProps} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders properly and shows no icons if you have neither created the proposal nor voted', () => {
    const mockProps = {
      ...mockProposalCardActionsProps,
      votesOfVoter: {
        action: null,
        votingPower: null,
        proposalCreated: false,
      },
    };
    const { container } = render(<ProposalCardActions {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
