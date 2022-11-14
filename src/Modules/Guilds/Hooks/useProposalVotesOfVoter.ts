import BaseERC20Guild from 'contracts/BaseERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { WagmiUseContractReadResponse } from 'Modules/Guilds/Hooks/types';
import { getProposalIdFromEvent } from 'utils/event';

export interface UseProposalVotesOfVoterReturn {
  option: string;
  votingPower: BigNumber;
}

const useProposalVotesOfVoter = (
  guildAddress: string,
  proposalId: string,
  userAddress: string
): WagmiUseContractReadResponse<UseProposalVotesOfVoterReturn> => {
  const { data, refetch, ...rest } = useContractRead({
    enabled: !!guildAddress && !!proposalId && !!userAddress,
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    functionName: 'getProposalVotesOfVoter',
    args: [proposalId, userAddress],
  });

  useContractEvent({
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    eventName: 'VoteAdded',
    listener(event) {
      const eventProposalId = getProposalIdFromEvent(event);
      if (proposalId === eventProposalId) refetch();
    },
  });

  const parsedData = useMemo<UseProposalVotesOfVoterReturn>(() => {
    if (!data?.votingPower || !data?.option) {
      return { option: null, votingPower: null };
    }
    if (
      BigNumber.from(data?.votingPower || 0).gt(0) &&
      BigNumber.isBigNumber(data?.option)
    ) {
      return {
        option: data.option.toString(),
        votingPower: data?.votingPower,
      };
    }
    return { option: null, votingPower: null };
  }, [data?.option, data?.votingPower]); // eslint-disable-line

  return {
    data: parsedData,
    refetch,
    ...rest,
  };
};

export default useProposalVotesOfVoter;
