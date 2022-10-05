import ERC20Guild from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { WagmiUseContractReadResponse } from 'Modules/Guilds/Hooks/types';

export interface UseProposalVotesOfVoterReturn {
  option: string;
  votingPower: BigNumber;
}

const useProposalVotesOfVoter = (
  guildAddress: string,
  proposalId: string,
  userAddress: string
): WagmiUseContractReadResponse<UseProposalVotesOfVoterReturn> => {
  const { data, ...rest } = useContractRead({
    enabled: !!guildAddress && !!proposalId && !!userAddress,
    addressOrName: guildAddress,
    contractInterface: ERC20Guild.abi,
    functionName: 'getProposalVotesOfVoter',
    args: [proposalId, userAddress],
    watch: true,
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
    ...rest,
  };
};

export default useProposalVotesOfVoter;
