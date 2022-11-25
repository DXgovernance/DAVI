import { ERC20 } from 'contracts/ts-files/ERC20';
import { BigNumber } from 'ethers';
import { useContractEvent, useContractRead } from 'wagmi';

export const useERC20Allowance = (
  contractAddress: string,
  walletAddress: `0x${string}`,
  spenderAddress: `0x${string}`
) => {
  const { data, refetch, ...rest } = useContractRead({
    address: contractAddress,
    abi: ERC20.abi,
    functionName: 'allowance',
    args: [walletAddress, spenderAddress],
  });

  useContractEvent({
    address: contractAddress,
    abi: ERC20.abi,
    eventName: 'Approval',
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
