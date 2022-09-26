import useGuildMemberTotal from 'Modules/Guilds/Hooks/useGuildMemberTotal';
import {
  MOCK_GUILD_MEMBERS_TOTAL,
  MOCK_GUILD_ADDRESS,
  MOCK_TOKEN,
  MOCK_CONTRACT_INTERFACE,
} from 'Modules/Guilds/Hooks/fixtures';
import wagmi, { useContractRead } from 'wagmi';

jest.mock('wagmi', () => ({
  useContractRead: () => ({
    data: MOCK_GUILD_MEMBERS_TOTAL,
    isLoading: false,
    isError: false,
  }),
}));

describe('useGuildMemberTotal', () => {
  it('should return guild member totals', () => {
    const { data, isError, isLoading } = useGuildMemberTotal(
      MOCK_GUILD_ADDRESS,
      MOCK_TOKEN,
      false
    );

    expect(data).toMatchInlineSnapshot(`3`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });

  it('should call getTotalHolders when isRepGuild is true', () => {
    const isRepGuild = true;

    const mockUseContractRead = jest
      .spyOn(wagmi, 'useContractRead')
      .mockImplementationOnce(() => ({
        ...useContractRead({
          addressOrName: MOCK_GUILD_ADDRESS,
          contractInterface: MOCK_CONTRACT_INTERFACE,
          functionName: 'getTotalHolders',
        }),
        isLoading: false,
        isError: false,
      }));

    useGuildMemberTotal(MOCK_GUILD_ADDRESS, MOCK_TOKEN, isRepGuild);

    expect(mockUseContractRead).toBeCalledWith(
      expect.objectContaining({
        functionName: 'getTotalHolders',
      })
    );
  });

  it('should call getTotalMembers when isRepGuild is false', () => {
    const isRepGuild = false;

    const mockUseContractRead = jest
      .spyOn(wagmi, 'useContractRead')
      .mockImplementationOnce(() => ({
        ...useContractRead({
          addressOrName: MOCK_GUILD_ADDRESS,
          contractInterface: MOCK_CONTRACT_INTERFACE,
          functionName: 'getTotalMembers',
        }),
        isLoading: false,
        isError: false,
      }));

    useGuildMemberTotal(MOCK_GUILD_ADDRESS, MOCK_TOKEN, isRepGuild);

    expect(mockUseContractRead).toBeCalledWith(
      expect.objectContaining({
        functionName: 'getTotalMembers',
      })
    );
  });
});
