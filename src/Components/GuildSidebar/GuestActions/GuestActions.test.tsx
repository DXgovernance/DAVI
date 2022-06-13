import { GuestActions } from './GuestActions';
import { render } from 'utils/tests';
import { withData } from './fixtures';

describe('GuestActions', () => {
  it('Should match snapshot without data', () => {
    const { container } = render(<GuestActions />);
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot with data', () => {
    const { container } = render(<GuestActions {...withData} />);
    expect(container).toMatchSnapshot();
  });
});
