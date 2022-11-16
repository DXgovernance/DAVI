import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';

interface useTotalLockedAtProps {
  contractAddress: string;
  snapshotId: string;
}

/**
 * Get the total locked amount at snapshot
 */
const useTotalLockedAt = ({
  contractAddress,
  snapshotId,
}: useTotalLockedAtProps) => {
  const { data, refetch, ...rest } = useContractRead({
    enabled: !!contractAddress && !!snapshotId,
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'totalLockedAt',
    args: [snapshotId],
  });

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

  return { data, refetch, ...rest };
};

export default useTotalLockedAt;
