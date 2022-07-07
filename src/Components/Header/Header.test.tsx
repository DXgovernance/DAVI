import Header from './Header';
import { render } from 'utils/tests';

describe.skip('Header', () => {
  it('Should match snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
