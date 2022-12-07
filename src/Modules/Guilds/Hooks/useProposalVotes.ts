import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';

const useProposalVotes = (guildId: string, proposalId: string) => {
  const { data, refetch, ...rest } = useContractRead({
    address: guildId,
    abi: BaseERC20GuildContract.abi,
    functionName: 'proposalVotes',
    args: [proposalId],
  });

  useContractEvent({
    address: guildId,
    abi: BaseERC20GuildContract.abi,
    eventName: 'VoteAdded',
    listener(node, label, eventDetails) {
      if (node === proposalId) refetch();
    },
  });

  return { data, refetch, ...rest };
};

export default useProposalVotes;
