import { BigNumber } from 'ethers';
import { useContractReads } from 'wagmi';
import ERC20 from 'contracts/ERC20.json';

interface ERC20InfoHook {
  data: ERC20Info;
  isError: boolean;
  isLoading: boolean;
}

export type ERC20Info = {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumber;
};

export const useERC20Info = (contractAddress: string): ERC20InfoHook => {
  const erc20InfoContract = {
    addressOrName: contractAddress,
    contractInterface: ERC20.abi,
  };
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...erc20InfoContract,
        functionName: 'name',
      },
      {
        ...erc20InfoContract,
        functionName: 'symbol',
      },
      {
        ...erc20InfoContract,
        functionName: 'decimals',
      },
      {
        ...erc20InfoContract,
        functionName: 'totalSupply',
      },
    ],
  });
  if (!data || data.some(v => v === null)) {
    return { data: undefined, isError, isLoading };
  }
  return {
    data: {
      name: data[0].toString(),
      symbol: data[1].toString(),
      decimals: Number(data[2]),
      totalSupply: BigNumber.from(data[3]),
    },
    isError,
    isLoading,
  };
};

export const getTokenInfoParsedParams = (tokenInfo: ERC20Info) =>
  tokenInfo
    ? [
        {
          component: 'integer',
          type: 'uint256',
          defaultValue: '',
          description: 'Token Decimals',
          name: 'approvalTokenDecimals',
          value: tokenInfo?.decimals,
        },
        {
          component: 'string',
          type: 'string',
          defaultValue: '',
          description: 'Token Name',
          name: 'approvalTokenName',
          value: tokenInfo?.name,
        },
        {
          component: 'string',
          type: 'string',
          defaultValue: '',
          description: 'Token Symbol',
          name: 'approvalTokenSymbol',
          value: tokenInfo?.symbol,
        },
        {
          component: 'tokenAmount',
          type: 'uint256',
          defaultValue: '',
          description: 'Token Total Supply',
          name: 'approvalTokenTotalSupply',
          value: tokenInfo?.totalSupply,
        },
      ]
    : [];
