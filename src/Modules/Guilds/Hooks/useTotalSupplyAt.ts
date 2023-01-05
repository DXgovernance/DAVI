import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import { BigNumber } from 'ethers';
import { useContractEvent, useContractRead } from 'wagmi';

// ! Deprecated. Moved to store. Delete when the test is ready

interface useTotalSupplyAtProps {
  contractAddress: string;
  snapshotId: string;
}

/**
 * Get the total supply amount at snapshot
 */
const useTotalSupplyAt = ({
  contractAddress, // tokenAddress,
  snapshotId,
}: useTotalSupplyAtProps) => {
  const { data, refetch, ...rest } = useContractRead({
    enabled: !!contractAddress && !!snapshotId,
    address: contractAddress,
    abi: ERC20SnapshotRep.abi,
    functionName: 'totalSupplyAt',
    args: [BigNumber.from(snapshotId ? snapshotId : '0')],
  });

  useContractEvent({
    address: contractAddress,
    abi: ERC20SnapshotRep.abi,
    eventName: 'Transfer',
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

export default useTotalSupplyAt;
