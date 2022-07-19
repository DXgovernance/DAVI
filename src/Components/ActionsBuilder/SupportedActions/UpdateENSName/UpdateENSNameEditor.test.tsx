import { render } from 'utils/tests';
import UpdateENSNameEditor from './UpdateENSNameEditor';
describe('UpdateENSNameEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UpdateENSNameEditor decodedCall={''} />);
    expect(container).toMatchSnapshot();
  });
});
