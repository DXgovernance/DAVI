import { render } from 'utils/tests';
import { EditButton } from './EditButton';

describe('AddButton', () => {
  it('Should match snapshot', () => {
    const { container } = render(<EditButton>Test</EditButton>);
    expect(container).toMatchSnapshot();
  });
});
