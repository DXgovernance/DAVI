import { BigNumber } from 'ethers';
import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import useCurrentSnapshotId from './useCurrentSnapshotId';
import { useContractRead } from 'wagmi';

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
  const { data, ...rest } = useContractRead(
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
  return {
    data: data ? BigNumber.from(data) : undefined,
    ...rest,
  };
};

export default useVotingPowerOfAt;
