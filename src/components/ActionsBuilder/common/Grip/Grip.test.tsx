import { render } from 'utils/tests';
import { Grip } from './Grip';

describe('AddButton', () => {
  it('Should match snapshot', () => {
    const { container } = render(<Grip />);
    expect(container).toMatchSnapshot();
  });
});
