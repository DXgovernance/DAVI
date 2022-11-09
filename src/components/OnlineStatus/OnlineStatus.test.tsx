import { OnlineStatus } from './OnlineStatus';
import useOnlineStatus from 'hooks/Guilds/useOnlineStatus';
import { render } from 'utils/tests';

jest.mock('hooks/Guilds/useOnlineStatus');

describe('OnlineStatus', () => {
  it('Should match snapshot', () => {
    (useOnlineStatus as any).mockImplementation(() => ({ isOnline: true }));
    const { container } = render(
      <OnlineStatus>
        <h1>TEST</h1>
      </OnlineStatus>
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render children', () => {
    (useOnlineStatus as any).mockImplementation(() => ({ isOnline: true }));
    const { getByText } = render(
      <OnlineStatus>
        <h1>TEST</h1>
      </OnlineStatus>
    );
    expect(getByText('TEST')).toBeInTheDocument();
  });

  it('Should render offline box', () => {
    (useOnlineStatus as any).mockImplementation(() => ({ isOnline: false }));
    const { getByTestId } = render(
      <OnlineStatus>
        <h1>TEST</h1>
      </OnlineStatus>
    );
    expect(getByTestId('offline-wrapper')).toBeInTheDocument();
  });
});
