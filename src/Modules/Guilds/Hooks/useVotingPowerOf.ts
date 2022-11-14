import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import useVotingPowerOfAt from 'Modules/Guilds/Hooks/useVotingPowerOfAt';
import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';
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
  const {
    data: votingPowerOfResponse,
    refetch,
    ...rest
  } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'votingPowerOf',
    args: [userAddress],
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
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
