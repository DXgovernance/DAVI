import ERC20ABI from 'abis/ERC20.json';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

export const useERC20Balance = (
  contractAddress: string,
  walletAddress: string
) => {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ERC20ABI,
    functionName: 'balanceOf',
    args: [walletAddress],
  });
  return {
    data: data ? BigNumber.from(data) : null,
    isError,
    isLoading,
  };
};
