import ERC20Guild from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

const useActiveProposalsNow = (guildAddress: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: ERC20Guild.abi,
    functionName: 'getActiveProposalsNow',
  });
  return { data, ...rest };
};

export default useActiveProposalsNow;
