import { GuestActions, GuestActionsProps } from './GuestActions';
import { render } from 'utils/tests';
import { withData } from './fixtures';

const propsWithData: GuestActionsProps = {
  ...withData,
  onShowStakeModal: jest.fn(),
  onShowWalletModal: jest.fn(),
};

describe('GuestActions', () => {
  it('Should match snapshot without data', () => {
    const { container } = render(<GuestActions />);
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot with data', () => {
    const { container } = render(<GuestActions {...propsWithData} />);
    expect(container).toMatchSnapshot();
  });
});
