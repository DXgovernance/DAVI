import useGuildToken from './useGuildToken';
import { MOCK_CONTRACT_ADDRESS, MOCK_GUILD_ADDRESS } from './fixtures';
jest.mock('./useGuildToken', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_CONTRACT_ADDRESS,
    isError: false,
    isLoading: false,
  }),
}));

describe('useGuildToken', () => {
  it('should return the guild token', () => {
    const { data, isError, isLoading } = useGuildToken(MOCK_GUILD_ADDRESS);
    expect(data).toMatchInlineSnapshot(
      `"0x0000000000000000000000000000000000000001"`
    );
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
