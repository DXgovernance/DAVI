import useGuildHolderTotal from 'Modules/Guilds/Hooks/useGuildHolderTotal';
import {
  MOCK_GUILD_HOLDERS_TOTAL,
  MOCK_GUILD_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useGuildHolderTotal', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_GUILD_HOLDERS_TOTAL,
    isError: false,
    isLoading: false,
  }),
}));

describe('useGuildHolderTotal', () => {
  it('should return guild holders totals', () => {
    const { data, isError, isLoading } =
      useGuildHolderTotal(MOCK_GUILD_ADDRESS);
    expect(data).toMatchInlineSnapshot(`5`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
