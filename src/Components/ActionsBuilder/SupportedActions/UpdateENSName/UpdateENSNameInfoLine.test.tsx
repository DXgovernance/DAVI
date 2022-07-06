import { render } from 'utils/tests';
import UpdateENSNameInfoLine from './UpdateENSNameInfoLine';
describe.skip('UpdateENSInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UpdateENSNameInfoLine />);
    expect(container).toMatchSnapshot();
  });
});
