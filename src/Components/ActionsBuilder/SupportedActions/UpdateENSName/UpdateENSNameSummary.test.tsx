import { render } from 'utils/tests';
import UpdateENSNameSummary from './UpdateENSNameSummary';
describe.skip('UpdateENSNameSummary', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UpdateENSNameSummary />);
    expect(container).toMatchSnapshot();
  });
});
