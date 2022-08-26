import { render } from 'utils/tests';
import UpdateENSContentInfoLine from './UpdateENSContentInfoLine';
import { mockDecodedCallUpdateENSContent } from './fixtures';

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

describe('UpdateENSInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <UpdateENSContentInfoLine decodedCall={mockDecodedCallUpdateENSContent} />
    );
    expect(container).toMatchSnapshot();
  });
});
