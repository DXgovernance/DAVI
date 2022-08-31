import { render } from 'utils/tests';
import { AddButton } from './AddButton';

describe('AddButton', () => {
  it('Should match snapshot', () => {
    const { container } = render(<AddButton label="Add" />);
    expect(container).toMatchSnapshot();
  });
});
