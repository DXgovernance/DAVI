import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { BigNumber } from 'ethers';
import useCurrentSnapshotId from 'Modules/Guilds/Hooks/useCurrentSnapshotId';
import { useContractEvent, useContractRead } from 'wagmi';

interface useVotingPowerOfAtProps {
  contractAddress: string;
  userAddress: `0x${string}`;
  snapshotId?: string;
  fallbackSnapshotId?: boolean;
}

/**
 * Get the voting power of an account at snapshot id
 */
const useVotingPowerOfAt = ({
  contractAddress,
  userAddress,
  snapshotId,
  fallbackSnapshotId = true,
}: useVotingPowerOfAtProps) => {
  const { data: currentSnapshotId } = useCurrentSnapshotId({ contractAddress });
  const SNAPSHOT_ID = fallbackSnapshotId
    ? snapshotId ?? currentSnapshotId?.toString()
    : snapshotId;

  const { data, refetch, ...rest } = useContractRead(
    SNAPSHOT_ID
      ? {
          address: contractAddress,
          abi: SnapshotERC20Guild.abi,
          functionName: 'votingPowerOfAt',
          args: [userAddress, BigNumber.from(SNAPSHOT_ID)],
        }
      : {
          address: contractAddress,
          abi: SnapshotERC20Guild.abi,
          functionName: 'votingPowerOf',
          args: [userAddress],
        }
  );

  useContractEvent({
    address: contractAddress,
    abi: SnapshotERC20Guild.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    address: contractAddress,
    abi: SnapshotERC20Guild.abi,
    eventName: 'TokensWithdrawn',
    listener() {
      refetch();
    },
  });

  return {
    data: data ? BigNumber.from(data) : undefined,
    refetch,
    ...rest,
  };
};

export default useVotingPowerOfAt;
