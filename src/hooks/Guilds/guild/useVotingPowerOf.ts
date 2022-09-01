import useGuildImplementationType from './useGuildImplementationType';
import useVotingPowerOfAt from './useVotingPowerOfAt';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

interface UseVotingPowerOfProps {
  contractAddress: string;
  userAddress: string;
  snapshotId?: string;
  fallbackSnapshotId?: boolean;
}
/**
 * Get the voting power of an account
 */
export const useVotingPowerOf = ({
  contractAddress,
  userAddress,
  snapshotId,
  fallbackSnapshotId = true,
}: UseVotingPowerOfProps) => {
  const { isSnapshotGuild } = useGuildImplementationType(contractAddress);
  const { data: votingPowerOfResponse, ...rest } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'votingPowerOf',
    args: [userAddress],
  });

  const votingPowerAtSnapshotResponse = useVotingPowerOfAt({
    contractAddress,
    userAddress,
    snapshotId,
    fallbackSnapshotId,
  });

  if (isSnapshotGuild) return votingPowerAtSnapshotResponse;
  return {
    data: votingPowerOfResponse
      ? BigNumber.from(votingPowerOfResponse)
      : undefined,
    ...rest,
  };
};
