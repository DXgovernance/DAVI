import BaseERC20Guild from 'contracts/BaseERC20Guild.json';
import { useContractRead } from 'wagmi';

const useGuildToken = (
  guildAddress: string
): { data: `0x${string}`; [rest: string]: any } => {
  const { data, ...rest } = useContractRead({
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getToken',
  });

  const formattedTokenAddress = data
    ? (data.toString() as `0x${string}`)
    : undefined;

  return { data: formattedTokenAddress, ...rest };
};

export default useGuildToken;
