import { render } from '../../utils/tests';
import '@testing-library/jest-dom';
import { GuildSidebar } from './GuildSidebar';
import { withData } from './fixtures';

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
