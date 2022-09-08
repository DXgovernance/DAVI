import { useGuildRegistry } from 'Modules/Guilds/Hooks/useGuildRegistry';
import {
  MOCK_CONTRACT_ADDRESS,
  MOCK_CONTRACT_ADDRESSES,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useGuildRegistry', () => ({
  useGuildRegistry: () => ({
    data: MOCK_CONTRACT_ADDRESSES,
    isError: false,
    isLoading: false,
  }),
}));

describe('useGuildRegistry', () => {
  it('should return guilds in the registry', () => {
    const { data, isError, isLoading } = useGuildRegistry(
      MOCK_CONTRACT_ADDRESS
    );
    expect(data).toMatchInlineSnapshot(`
      Array [
        "0x0000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000003",
      ]
    `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
