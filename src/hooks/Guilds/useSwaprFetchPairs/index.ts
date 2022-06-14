// import { useEffect, useState } from 'react';

interface SwaprFetchPairsInterface {
  address: string;
  reserve0: string;
  reserve1: string;
  reserveUSD: string;
  reserveNativeCurrency: string;
  totalSupply: string;
  token0: {
    address: string;
    name: string;
    symbol: string;
    decimals: string;
  };
  token1: {
    address: string;
    name: string;
    symbol: string;
    decimals: string;
  };
  liquidityMiningCampaigns: [];
}

export const useSwaprFetchPairs = async (
  lowerTimeLimit: number,
  userId: string,
  pageSize: number,
  lastId: string
): Promise<SwaprFetchPairsInterface[]> => {
  const subgraphUrl =
    'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-mainnet-v2';

  const query = `
    {
    pairs(first: ${pageSize}, where: { id_gt: "${lastId}" }) {
      address: id
      reserve0
      reserve1
      reserveUSD
      reserveNativeCurrency
      totalSupply
      token0 {
        address: id
        name
        symbol
        decimals
      }
      token1 {
        address: id
        name
        symbol
        decimals
      }
      liquidityMiningCampaigns(where: { endsAt_gt: "${lowerTimeLimit}" }) {
        address: id
        duration
        startsAt
        endsAt
        locked
        stakingCap
        rewards {
          token {
            address: id
            name
            symbol
            decimals
            derivedNativeCurrency
          }
          amount
        }
        stakedAmount
        liquidityMiningPositions(where: { stakedAmount_gt: 0, user: "${userId}" }) {
          id
        }
      }
    }
  }`;

  let { data } = await (
    await fetch(subgraphUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
  ).json();

  return data.pairs;
};
