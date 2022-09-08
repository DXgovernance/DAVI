import ERC20Guild from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

export interface UseProposalVotesOfVoterReturn {
  action: BigNumber;
  votingPower: BigNumber;
}
const useProposalVotesOfVoter = (
  guildAddress: string,
  proposalId: string,
  userAddress: string
) => {
  return useContractRead({
    enabled: !!guildAddress && !!proposalId && !!userAddress,
    addressOrName: guildAddress,
    contractInterface: ERC20Guild.abi,
    functionName: 'getProposalVotesOfVoter',
    args: [proposalId, userAddress],
  });
};

export default useProposalVotesOfVoter;
