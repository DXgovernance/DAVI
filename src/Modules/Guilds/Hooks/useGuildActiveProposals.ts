import BaseERC20Guild from 'contracts/BaseERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';

const useActiveProposalsNow = (guildAddress: string) => {
  const { data, refetch, ...rest } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    functionName: 'getActiveProposalsNow',
  });

  useContractEvent({
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener() {
      refetch();
    },
  });

  return { data, refetch, ...rest };
};

export default useActiveProposalsNow;
