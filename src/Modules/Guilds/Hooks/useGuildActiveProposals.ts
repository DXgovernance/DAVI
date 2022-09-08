import ERC20Guild from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

const useActiveProposalsNow = (guildAddress: string) => {
  return useContractRead({
    addressOrName: guildAddress,
    contractInterface: ERC20Guild.abi,
    functionName: 'getActiveProposalsNow',
  });
};

export default useActiveProposalsNow;
