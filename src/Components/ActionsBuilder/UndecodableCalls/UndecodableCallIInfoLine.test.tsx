import { render } from 'utils/tests';
import UndecodableCallInfoLine from './UndecodableCallInfoLine';

describe('UndecodableCallInfoLine', () => {
  it('renders', () => {
    const { container } = render(<UndecodableCallInfoLine />);
    expect(container).toMatchSnapshot();
  });
});
