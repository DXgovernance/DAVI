import { MemberActions } from './MemberActions';
import { render } from 'utils/tests';
import { propsWithData } from './fixtures';

describe('MemberActions', () => {
  it('Should match snapshot without data', () => {
    const { container } = render(<MemberActions />);
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot with data', () => {
    const { container } = render(<MemberActions {...propsWithData} />);
    expect(container).toMatchSnapshot();
  });
});
