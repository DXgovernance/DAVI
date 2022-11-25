import useGuildMemberTotal from 'Modules/Guilds/Hooks/useGuildMemberTotal';
import {
  MOCK_GUILD_MEMBERS_TOTAL,
  MOCK_GUILD_ADDRESS,
  MOCK_TOKEN,
} from 'Modules/Guilds/Hooks/fixtures';
import wagmi, { useContractReads } from 'wagmi';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

jest.mock('wagmi', () => ({
  useContractReads: () => ({
    data: MOCK_GUILD_MEMBERS_TOTAL,
  }),

  useContractEvent: () => jest.fn(),
}));

describe('useGuildMemberTotal', () => {
  it('should return guild member totals', () => {
    const { data } = useGuildMemberTotal(MOCK_GUILD_ADDRESS, MOCK_TOKEN, false);

    expect(data).toMatchInlineSnapshot(`3`);
  });

  it('should call getTotalHolders when isRepGuild is true', () => {
    const isRepGuild = true;
    const mockUseContractRead = jest
      .spyOn(wagmi, 'useContractReads')
      .mockImplementationOnce(() => ({
        ...(useContractReads({
          contracts: [
            {
              address: MOCK_TOKEN,
              abi: ERC20SnapshotRep.abi,
              functionName: 'getTotalHolders',
            },
          ],
        }) as any),
      }));

    useGuildMemberTotal(MOCK_GUILD_ADDRESS, MOCK_TOKEN, isRepGuild);

    expect(mockUseContractRead).toHaveBeenCalledWith({
      contracts: [
        {
          address: MOCK_TOKEN,
          abi: ERC20SnapshotRep.abi,
          functionName: 'getTotalHolders',
        },
      ],
    });
  });

  it('should call getTotalMembers when isRepGuild is false', () => {
    const isRepGuild = false;
    const mockUseContractRead = jest
      .spyOn(wagmi, 'useContractReads')
      .mockImplementationOnce(() => ({
        ...(useContractReads({
          contracts: [
            {
              address: MOCK_GUILD_ADDRESS,
              abi: BaseERC20Guild.abi,
              functionName: 'getTotalMembers',
            },
          ],
        }) as any),
      }));

    useGuildMemberTotal(MOCK_GUILD_ADDRESS, MOCK_TOKEN, isRepGuild);

    expect(mockUseContractRead).toHaveBeenCalledWith({
      contracts: [
        {
          address: MOCK_GUILD_ADDRESS,
          abi: BaseERC20Guild.abi,
          functionName: 'getTotalMembers',
        },
      ],
    });
  });
});
