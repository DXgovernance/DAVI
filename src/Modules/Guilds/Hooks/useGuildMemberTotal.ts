import ERC20Guild from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

const useGuildMemberTotal = (guildAddress: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: ERC20Guild.abi,
    functionName: 'getTotalMembers',
  });
  return { data: Number(data), ...rest };
};

export default useGuildMemberTotal;
