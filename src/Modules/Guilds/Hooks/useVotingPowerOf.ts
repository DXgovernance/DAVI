import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import useVotingPowerOfAt from 'Modules/Guilds/Hooks/useVotingPowerOfAt';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

interface UseVotingPowerOfProps {
  contractAddress: string;
  userAddress: `0x${string}`;
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
  const {
    data: votingPowerOfResponse,
    refetch,
    ...rest
  } = useContractRead({
    address: contractAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'votingPowerOf',
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

  const votingPowerAtSnapshotResponse = useVotingPowerOfAt({
    contractAddress,
    userAddress,
    snapshotId,
    fallbackSnapshotId,
  });

  if (isSnapshotGuild && snapshotId) return votingPowerAtSnapshotResponse;
  return {
    data: votingPowerOfResponse
      ? BigNumber.from(votingPowerOfResponse)
      : undefined,
    ...rest,
  };
};
