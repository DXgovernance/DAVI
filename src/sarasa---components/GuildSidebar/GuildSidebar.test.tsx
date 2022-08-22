import { render } from '../../utils/tests';
import '@testing-library/jest-dom';
import { GuildSidebar } from './GuildSidebar';
import { withData } from './fixtures';

jest.mock('Modules/Guilds/Hooks/useTypedParams', () => ({
  useTypedParams: () => ({
    chainName: 'localhost',
    guildId: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
  }),
}));

describe('GuildSidebar', () => {
  it(`Should render without data`, async () => {
    const { container } = render(<GuildSidebar />);
    expect(container).toMatchSnapshot();
  });

  it(`Should render with data`, async () => {
    const { container } = render(<GuildSidebar {...withData} />);
    expect(container).toMatchSnapshot();
  });
});
