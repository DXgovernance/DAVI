import useEtherSWR from '../ether-swr/useEtherSWR';
import ERC20ABI from 'abis/ERC20.json';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';

export const useERC20Balance = (
  contractAddress: string,
  walletAddress: string
) => {
  const { data, ...rest } = useEtherSWR(
    contractAddress && walletAddress
      ? [contractAddress, 'balanceOf', walletAddress]
      : [],
    {
      ABIs: new Map([[contractAddress, ERC20ABI]]),
    }
  );

  const parsed = useMemo(() => {
    if (!data) return undefined;

    return BigNumber.from(data);
  }, [data]);

  return { data: parsed, ...rest };
};

// import ERC20ABI from 'abis/ERC20.json';
// import { BigNumber } from 'ethers';
// import { useContractRead } from 'wagmi';

// export const useERC20Balance = (
//   contractAddress: string,
//   walletAddress: string
// ) => {
//   const { data, isError, isLoading} = useContractRead({
//     addressOrName: contractAddress,
//     contractInterface: ERC20ABI,
//     functionName: 'balanceOf',
//     args: [walletAddress],
//   })
//   console.log({data})
//   return {
//     data: BigNumber.from(data), isError, isLoading
//   }
// };
