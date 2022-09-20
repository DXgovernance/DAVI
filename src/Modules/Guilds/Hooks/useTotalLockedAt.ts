import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import { useContractRead } from 'wagmi';

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
  return useContractRead({
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'totalLockedAt',
    args: [snapshotId],
    watch: true,
  });
};

export default useTotalLockedAt;
