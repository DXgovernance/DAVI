import { render } from 'utils/tests';
import UpdateENSNameSummary from './UpdateENSNameSummary';

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));
describe.skip('UpdateENSNameSummary', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UpdateENSNameSummary />);
    expect(container).toMatchSnapshot();
  });
});
