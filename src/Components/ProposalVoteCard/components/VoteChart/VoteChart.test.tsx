import { render } from 'utils/tests';
import VoteChart from './VoteChart';
import { mockVoteChart } from 'Components/Fixtures';

describe('VoteChart', () => {
  it('matches the snapshot', () => {
    const { container } = render(<VoteChart {...mockVoteChart} />);
    expect(container).toMatchSnapshot();
  });
});
