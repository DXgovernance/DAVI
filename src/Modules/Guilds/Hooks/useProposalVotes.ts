import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { useContractRead } from 'wagmi';

const useProposalVotes = (guildId: string, proposalId: string) => {
  return useContractRead({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'proposalVotes',
    args: [proposalId],
    watch: true,
  });
};

export default useProposalVotes;
