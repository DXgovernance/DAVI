import useEtherSWR from '../ether-swr/useEtherSWR';
import ERC20ABI from 'abis/ERC20.json';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';

export type ERC20Info = {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumber;
};

export const useERC20Info = (contractAddress: string) => {
  const { data, ...rest } = useEtherSWR(
    contractAddress
      ? [
          [contractAddress, 'name'],
          [contractAddress, 'symbol'],
          [contractAddress, 'decimals'],
          [contractAddress, 'totalSupply'],
        ]
      : [],
    {
      ABIs: new Map([[contractAddress, ERC20ABI]]),
    }
  );

  const transformedData: ERC20Info = useMemo(() => {
    if (!data) return undefined;

    return {
      name: data[0],
      symbol: data[1],
      decimals: data[2],
      totalSupply: data[3],
    };
  }, [data]);

  return { data: transformedData, ...rest };
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

// import ERC20ABI from 'abis/ERC20.json';
// import { BigNumber } from 'ethers';
// import { useContractReads } from 'wagmi';

// interface ERC20InfoHook {
//   data: ERC20Info;
//   isError: boolean;
//   isLoading: boolean;
// }

// export type ERC20Info = {
//   name: string;
//   symbol: string;
//   decimals: number;
//   totalSupply: BigNumber;
// };

// export const useERC20Info = (contractAddress: string): ERC20InfoHook => {
//   console.log({ contractAddress });
//   const erc20InfoContract = {
//     addressOrName: contractAddress,
//     contractInterface: ERC20ABI,
//   };
//   const { data, isError, isLoading } = useContractReads({
//     contracts: [
//       {
//         ...erc20InfoContract,
//         functionName: 'name',
//       },
//       {
//         ...erc20InfoContract,
//         functionName: 'symbol',
//       },
//       {
//         ...erc20InfoContract,
//         functionName: 'decimals',
//       },
//       {
//         ...erc20InfoContract,
//         functionName: 'totalSupply',
//       },
//     ],
//   });
//   console.log({ data });
//   return {
//     data: {
//       name: data[0].toString(),
//       symbol: data[1].toString(),
//       decimals: Number(data[2]),
//       totalSupply: BigNumber.from(data[3]),
//     },
//     isError,
//     isLoading,
//   };
// };

// export const getTokenInfoParsedParams = (tokenInfo: ERC20Info) =>
//   tokenInfo
//     ? [
//         {
//           component: 'integer',
//           type: 'uint256',
//           defaultValue: '',
//           description: 'Token Decimals',
//           name: 'approvalTokenDecimals',
//           value: tokenInfo?.decimals,
//         },
//         {
//           component: 'string',
//           type: 'string',
//           defaultValue: '',
//           description: 'Token Name',
//           name: 'approvalTokenName',
//           value: tokenInfo?.name,
//         },
//         {
//           component: 'string',
//           type: 'string',
//           defaultValue: '',
//           description: 'Token Symbol',
//           name: 'approvalTokenSymbol',
//           value: tokenInfo?.symbol,
//         },
//         {
//           component: 'tokenAmount',
//           type: 'uint256',
//           defaultValue: '',
//           description: 'Token Total Supply',
//           name: 'approvalTokenTotalSupply',
//           value: tokenInfo?.totalSupply,
//         },
//       ]
//     : [];
