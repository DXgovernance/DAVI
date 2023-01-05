import { GuildCard } from './GuildCard';
import { render } from '../../utils/tests';
import '@testing-library/jest-dom';
import { fullParameters, loadingParameters, noProposals } from './fixtures';

jest.mock('wagmi', () => ({
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
}));

describe('GuildCard', () => {
  it(`Should render with full parameters`, async () => {
    const { container } = render(<GuildCard {...fullParameters} />);
    expect(container).toMatchSnapshot();
  });

  it(`Should render 'No proposals' when there are zero proposals'`, async () => {
    const { container } = render(<GuildCard {...noProposals} />);
    expect(container).toMatchSnapshot();
  });

  it(`Should render loading state skeleton`, async () => {
    const { container } = render(<GuildCard {...loadingParameters} />);
    expect(container).toMatchSnapshot();
  });
});
