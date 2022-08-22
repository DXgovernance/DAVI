import useEtherSWR from '../useEtherSWR';
import ERC20 from 'contracts/ERC20.json';
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
      ABIs: new Map([[contractAddress, ERC20.abi]]),
    }
  );

  const parsed = useMemo(() => {
    if (!data) return undefined;

    return BigNumber.from(data);
  }, [data]);

  return { data: parsed, ...rest };
};
