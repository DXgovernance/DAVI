import { ProposalInfoCard } from '.';
import { render } from '../../utils/tests';
import { fullParameters, loadingParameters } from './fixture';

jest.mock('contexts/index', () => jest.fn());

describe('ProposalInfoCard', () => {
  it('Should render will full parameters', () => {
    const { container } = render(<ProposalInfoCard {...fullParameters} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render loading state', () => {
    const { container } = render(<ProposalInfoCard {...loadingParameters} />);
    expect(container).toMatchSnapshot();
  });
});
