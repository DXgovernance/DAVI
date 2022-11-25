import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { WagmiUseContractReadResponse } from 'Modules/Guilds/Hooks/types';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

export interface UseProposalVotesOfVoterReturn {
  option: string;
  votingPower: BigNumber;
}

const useProposalVotesOfVoter = (
  guildAddress: `0x${string}`,
  proposalId: `0x${string}`,
  userAddress: `0x${string}`
): WagmiUseContractReadResponse<UseProposalVotesOfVoterReturn> => {
  const abi = BaseERC20Guild.abi;

  const { data, refetch, ...rest } = useContractRead({
    enabled: !!guildAddress && !!proposalId && !!userAddress,
    address: guildAddress,
    abi: abi,
    functionName: 'getProposalVotesOfVoter',
    args: [proposalId, userAddress],
  });

  useContractEvent({
    address:
      !!guildAddress && !!proposalId && !!userAddress ? guildAddress : null,
    abi: BaseERC20Guild.abi,
    eventName: 'VoteAdded',
    listener() {
      refetch();
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
