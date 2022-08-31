import ERC20Guild from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

const useGuildToken = (guildAddress: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: ERC20Guild.abi,
    functionName: 'getToken',
  });
  return { data: data.toString(), ...rest };
};

export default useGuildToken;
