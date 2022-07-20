import { Contract } from 'ethers';
import ERC20Guild_ABI from '../../../contracts/ERC20Guild.json';
import { ERC20Guild } from '../../../types/contracts/ERC20Guild';
import ERC20_ABI from '../../../contracts/ERC20.json';
import { ERC20 } from '../../../types/contracts/ERC20';
import { useProvider, useSigner } from 'wagmi';
import { useMemo } from 'react';
import { getContract } from '@wagmi/core';

export default function useContract<T extends Contract>(
  contractId: string,
  abi: any,
  chainId?: number,
  withSignerIfPossible = true
): T | null {
  const { data: signer, isSuccess } = useSigner();
  const provider = useProvider();

  return useMemo(() => {
    if (!provider || !contractId || !abi) return null;
    try {
      const contract = getContract({
        addressOrName: contractId,
        contractInterface: abi,
        signerOrProvider: withSignerIfPossible && isSuccess ? signer : provider,
      });

      return contract;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [
    contractId,
    abi,
    provider,
    withSignerIfPossible,
    isSuccess,
    signer,
  ]) as unknown as T;
}

export function useERC20Guild(
  contractId: string,
  withSignerIfPossible?: boolean,
  chainId?: number
) {
  return useContract<ERC20Guild>(
    contractId,
    ERC20Guild_ABI.abi,
    chainId,
    withSignerIfPossible
  );
}

export function useERC20(
  tokenAddress?: string,
  chainId?: number,
  withSignerIfPossible?: boolean
) {
  return useContract<ERC20>(
    tokenAddress,
    ERC20_ABI.abi,
    chainId,
    withSignerIfPossible
  );
}
