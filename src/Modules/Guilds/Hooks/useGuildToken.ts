import BaseERC20Guild from 'contracts/BaseERC20Guild.json';
import { useContractRead } from 'wagmi';

const useGuildToken = (guildAddress: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    functionName: 'getToken',
  });
  return { data: data ? data.toString() : undefined, ...rest };
};

export default useGuildToken;
