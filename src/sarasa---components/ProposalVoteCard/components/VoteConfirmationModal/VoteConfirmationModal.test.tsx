import { render } from 'utils/tests';
import VoteConfirmationModal from './VoteConfirmationModal';
import { mockVoteConfirmationModal } from '../../fixture';
import { screen } from '@testing-library/react';

describe('VoteConfirmationModal', () => {
  it('contains components in the modal', () => {
    render(<VoteConfirmationModal {...mockVoteConfirmationModal} />);
    expect(screen.getByText(/voteQuestion/i)).toBeInTheDocument();
    expect(screen.getByText(/noRevertAction/i)).toBeInTheDocument();
    expect(screen.getByText(/option/i)).toBeInTheDocument();
    expect(screen.getByText(/votingPower/i)).toBeInTheDocument();
    expect(screen.getByText(/voteImpact/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText('vote')).toBeInTheDocument();
  });
});
