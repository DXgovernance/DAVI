import { unix } from 'moment';
import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { useContractRead } from 'wagmi';
/**
 * Get the locked timestamp of a voter tokens
 * @param contractAddress address of the contract
 * @param userAddress address of the voter
 */
export const useVoterLockTimestamp = (
  contractAddress: string,
  userAddress: string
) => {
  const { data, ...rest } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'getVoterLockTimestamp',
    args: [userAddress],
    watch: true,
  });
  return {
    data: data ? unix(Number(data)) : undefined,
    ...rest,
  };
};
