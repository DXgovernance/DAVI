import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import { BigNumber } from 'ethers';
import { useContractEvent, useContractRead } from 'wagmi';

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
    addressOrName: contractAddress,
    contractInterface: ERC20SnapshotRep.abi,
    functionName: 'totalSupplyAt',
    args: [snapshotId],
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: ERC20SnapshotRep.abi,
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
