import { render } from 'utils/tests';
import VoteResults from './VoteResults';
import { mockVoteResults } from 'Components/Fixtures';

describe('VoteResults', () => {
  it('matches the snapshot', () => {
    const { container } = render(<VoteResults {...mockVoteResults} />);
    expect(container).toMatchSnapshot();
  });
});
