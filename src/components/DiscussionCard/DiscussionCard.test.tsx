import { render } from 'utils/tests';
import '@testing-library/jest-dom';
import { DiscussionCard } from './DiscussionCard';
import { fullParameters } from './fixtures';

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    ensName: 'test.eth',
  }),
}));

describe('DiscussionCard', () => {
  it('should render with full parameters', async () => {
    const { container } = render(<DiscussionCard {...fullParameters} />);
    expect(container).toMatchSnapshot();
  });
});
