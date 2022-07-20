import { render } from 'utils/tests';
import UpdateENSNameInfoLine from './UpdateENSNameInfoLine';

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

describe.skip('UpdateENSInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UpdateENSNameInfoLine />);
    expect(container).toMatchSnapshot();
  });
});
