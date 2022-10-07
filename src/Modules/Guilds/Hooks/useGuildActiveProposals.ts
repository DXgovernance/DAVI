import BaseERC20Guild from 'contracts/BaseERC20Guild.json';
import { useContractRead } from 'wagmi';

const useActiveProposalsNow = (guildAddress: string) => {
  return useContractRead({
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    functionName: 'getActiveProposalsNow',
    watch: true,
  });
};

export default useActiveProposalsNow;
