import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { BigNumber } from 'ethers';
import { useContractEvent, useContractRead } from 'wagmi';

// ! Deprecated. Moved to store. Delete when the test is ready

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
    address: contractAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'totalLockedAt',
    args: [BigNumber.from(snapshotId ? snapshotId : '0')],
  });

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

  return { data, refetch, ...rest };
};

export default useTotalLockedAt;
