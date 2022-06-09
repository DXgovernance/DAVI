import { render } from 'utils/tests';
import VoteChart from './VoteChart';
import { mockVoteChart } from '../../fixture';

jest.mock('contexts/index', () => jest.fn());

describe('VoteChart', () => {
  it('matches the snapshot', () => {
    const { container } = render(<VoteChart {...mockVoteChart} />);
    expect(container).toMatchSnapshot();
  });
});
