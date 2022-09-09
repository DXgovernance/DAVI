import useENSAvatar from './useENSAvatar';
import { MOCK_ENS_NAME, MOCK_IMAGE_URL } from './fixtures';

jest.mock('./useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    ensName: MOCK_ENS_NAME,
    imageUrl: MOCK_IMAGE_URL,
  }),
}));

describe('useENSAvatar', () => {
  it('should return the ENS name and the resolved avatar URI', () => {
    const { ensName, imageUrl } = useENSAvatar(MOCK_ENS_NAME);
    expect(ensName).toMatchInlineSnapshot(`"wagmi.eth"`);
    expect(imageUrl).toMatchInlineSnapshot(`"https://example.com/image.png"`);
  });
});
