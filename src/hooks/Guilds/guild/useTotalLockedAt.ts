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
  const { data, ...rest } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'totalLockedAt',
    args: [snapshotId],
  });
  return { data, ...rest };
};

export default useTotalLockedAt;
