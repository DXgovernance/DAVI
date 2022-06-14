import { render } from 'utils/tests';
import ProposalDescription from './ProposalDescription';
import { withMetadata, noMetadata, errorMetadata } from './fixtures';

jest.mock('contexts/index', () => jest.fn());

describe('ProposalDescription', () => {
  it('Should render with description', () => {
    const { container } = render(<ProposalDescription {...withMetadata} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render loading if it has no metadata', () => {
    const { container } = render(<ProposalDescription {...noMetadata} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render an error', () => {
    const { container } = render(<ProposalDescription {...errorMetadata} />);
    expect(container).toMatchSnapshot();
  });
});
