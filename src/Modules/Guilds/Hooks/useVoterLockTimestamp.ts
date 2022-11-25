import { unix } from 'moment';
import { useContractEvent, useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
/**
 * Get the locked timestamp of a voter tokens
 * @param contractAddress address of the contract
 * @param userAddress address of the voter
 */
export const useVoterLockTimestamp = (
  contractAddress: string,
  userAddress: `0x${string}`
) => {
  const { data, refetch, ...rest } = useContractRead({
    address: contractAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getVoterLockTimestamp',
    args: [userAddress],
  });

  useContractEvent({
    address: contractAddress,
    abi: BaseERC20Guild.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    address: contractAddress,
    abi: BaseERC20Guild.abi,
    eventName: 'TokensWithdrawn',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    address: contractAddress,
    abi: BaseERC20Guild.abi,
    eventName: 'VoteAdded',
    listener() {
      refetch();
    },
  });

  return {
    data: data ? unix(Number(data)) : undefined,
    ...rest,
  };
};
