import { render } from 'utils/tests';
import VoteResults from './VoteResults';
import { mockVoteResults } from '../../fixture';

jest.mock('contexts/index', () => jest.fn());

describe('VoteResults', () => {
  it('matches the snapshot', () => {
    const { container } = render(<VoteResults {...mockVoteResults} />);
    expect(container).toMatchSnapshot();
  });
});
