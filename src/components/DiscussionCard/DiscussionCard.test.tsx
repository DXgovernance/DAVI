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

jest.mock('contexts/Guilds/orbis', () => ({
  useOrbisContext: () => ({
    orbis: {
      getPosts: () => ({
        data: [1, 2, 3],
      }),
    },
  }),
}));

jest.mock('@orbisclub/orbis-sdk', () => {});

jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: 1 } }),
  chain: {
    mainnet: {},
  },
}));

describe('DiscussionCard', () => {
  it('should render with full parameters', async () => {
    const { container } = render(<DiscussionCard {...fullParameters} />);
    expect(container).toMatchSnapshot();
  });
});
