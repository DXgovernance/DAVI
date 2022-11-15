import { unix } from 'moment';
import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';
import { getVoterFromEvent } from 'utils/event';
/**
 * Get the locked timestamp of a voter tokens
 * @param contractAddress address of the contract
 * @param userAddress address of the voter
 */
export const useVoterLockTimestamp = (
  contractAddress: string,
  userAddress: string
) => {
  const { data, refetch, ...rest } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'getVoterLockTimestamp',
    args: [userAddress],
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'TokensLocked',
    listener(event) {
      const voter = getVoterFromEvent(event);
      if (voter === userAddress) refetch();
    },
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'TokensWithdrawn',
    listener(event) {
      const voter = getVoterFromEvent(event);
      if (voter === userAddress) refetch();
    },
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'VoteAdded',
    listener(event) {
      const voter = getVoterFromEvent(event);
      if (voter === userAddress) refetch();
    },
  });

  return {
    data: data ? unix(Number(data)) : undefined,
    ...rest,
  };
};
