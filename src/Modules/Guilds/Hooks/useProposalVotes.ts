import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

const useProposalVotes = (guildId: string, proposalId: string) => {
  return useContractRead({
    addressOrName: guildId,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'proposalVotes',
    args: [proposalId],
  });
};

export default useProposalVotes;
