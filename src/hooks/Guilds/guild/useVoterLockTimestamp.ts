import { unix } from 'moment';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
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
    contractInterface: ERC20GuildContract.abi,
    functionName: 'getVoterLockTimestamp',
    args: [userAddress],
  });

  return {
    data: data ? unix(data.toNumber()) : undefined,
    ...rest,
  };
};
