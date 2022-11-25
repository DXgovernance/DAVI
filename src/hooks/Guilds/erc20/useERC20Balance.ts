import ERC20 from 'contracts/ERC20.json';
import { BigNumber } from 'ethers';
import { useContractEvent, useContractRead } from 'wagmi';

export const useERC20Balance = (
  contractAddress: string,
  walletAddress: string
) => {
  const { data, refetch, ...rest } = useContractRead({
    address: contractAddress,
    abi: ERC20.abi,
    functionName: 'balanceOf',
    args: [walletAddress],
  });

  useContractEvent({
    address: contractAddress,
    abi: ERC20.abi,
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
