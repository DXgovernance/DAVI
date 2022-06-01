import { render } from 'utils/tests';
import VoteChart from './VoteChart';
import { mockVoteChart } from '../../mocks';

describe('VoteChart', () => {
  it('matches the snapshot', () => {
    const { container } = render(<VoteChart {...mockVoteChart} />);
    expect(container).toMatchSnapshot();
  });
});
