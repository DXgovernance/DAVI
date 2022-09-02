import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

export const useProposalVotes = (guildId: string, proposalId: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildId,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'proposalVotes',
    args: [proposalId],
  });
  return {
    data,
    ...rest,
  };
};
