import ERC20Guild from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { WagmiUseContractReadResponse } from 'Modules/Guilds/Hooks/types';

export interface UseProposalVotesOfVoterReturn {
  action: string;
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
    if (!data?.votingPower || !data?.action) {
      return { action: null, votingPower: null };
    }
    if (
      BigNumber.from(data?.votingPower || 0).gt(0) &&
      BigNumber.isBigNumber(data?.action)
    ) {
      return {
        action: data.action.toString(),
        votingPower: data?.votingPower,
      };
    }
    return { action: null, votingPower: null };
  }, [data?.action, data?.votingPower]); // eslint-disable-line

  return {
    data: parsedData,
    ...rest,
  };
};

export default useProposalVotesOfVoter;
