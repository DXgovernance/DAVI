import { BigNumber } from 'ethers';
import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import useCurrentSnapshotId from 'Modules/Guilds/Hooks/useCurrentSnapshotId';
import { useContractEvent, useContractRead } from 'wagmi';

interface useVotingPowerOfAtProps {
  contractAddress: string;
  userAddress: string;
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
          addressOrName: contractAddress,
          contractInterface: SnapshotERC20Guild.abi,
          functionName: 'votingPowerOfAt',
          args: [userAddress, SNAPSHOT_ID],
        }
      : {
          addressOrName: contractAddress,
          contractInterface: SnapshotERC20Guild.abi,
          functionName: 'votingPowerOf',
          args: [userAddress],
        }
  );

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
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
