import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

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
  const { data, ...rest } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ERC20SnapshotRep.abi,
    functionName: 'totalSupplyAt',
    args: [snapshotId],
  });
  return {
    data: data ? BigNumber.from(data) : undefined,
    ...rest,
  };
};

export default useTotalSupplyAt;
