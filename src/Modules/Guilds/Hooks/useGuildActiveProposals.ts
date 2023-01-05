import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useContractEvent, useContractRead } from 'wagmi';

const useActiveProposalsNow = (guildAddress: string) => {
  const { data, refetch, ...rest } = useContractRead({
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getActiveProposalsNow',
  });

  useContractEvent({
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener() {
      refetch();
    },
  });

  return { data, refetch, ...rest };
};

export default useActiveProposalsNow;
