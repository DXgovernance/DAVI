import ERC20 from 'contracts/ERC20.json';
import { BigNumber } from 'ethers';
import { useContractEvent, useContractRead } from 'wagmi';

export const useERC20Allowance = (
  contractAddress: string,
  walletAddress: string,
  spenderAddress: string
) => {
  const { data, refetch, ...rest } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ERC20.abi,
    functionName: 'allowance',
    args: [walletAddress, spenderAddress],
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: ERC20.abi,
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
