import { render } from 'utils/tests';
import UndecodableCallInfoLine from './UndecodableCallInfoLine';

describe('UndecodableCallInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UndecodableCallInfoLine />);
    expect(container).toMatchSnapshot();
  });
});
