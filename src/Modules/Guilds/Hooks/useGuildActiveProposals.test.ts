import useGuildActiveProposals from 'Modules/Guilds/Hooks/useGuildActiveProposals';
import {
  MOCK_BIG_NUMBER,
  MOCK_GUILD_ADDRESS,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useGuildActiveProposals', () => ({
  __esModule: true,
  default: () => ({
    data: MOCK_BIG_NUMBER,
    isError: false,
    isLoading: false,
  }),
}));

describe('useGuildActiveProposals', () => {
  it('should return active Guild proposals', () => {
    const { data, isError, isLoading } =
      useGuildActiveProposals(MOCK_GUILD_ADDRESS);
    expect(data).toMatchInlineSnapshot(`
      Object {
        "hex": "0x01",
        "type": "BigNumber",
      }
    `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
