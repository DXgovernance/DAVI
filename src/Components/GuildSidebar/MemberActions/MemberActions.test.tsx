import { MemberActions, MemberActionsProps } from './MemberActions';
import { render } from 'utils/tests';
import { propsWithData } from './fixtures';

const mockPropsWithData: MemberActionsProps = {
  ...propsWithData,
  onShowStakeModal: jest.fn(),
  onWithdraw: jest.fn(),
};

describe('MemberActions', () => {
  it('Should match snapshot without data', () => {
    const { container } = render(<MemberActions />);
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot with data', () => {
    const { container } = render(<MemberActions {...mockPropsWithData} />);
    expect(container).toMatchSnapshot();
  });
});
