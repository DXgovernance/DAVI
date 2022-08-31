import { useEffect, useState } from 'react';

export interface SwaprFetchPairsInterface {
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
  chainId: number,
  lowerTimeLimit: number = 1,
  userId: string,
  pageSize: number,
  lastId: string
): Promise<[SwaprFetchPairsInterface[], string]> => {
  const networkApiPair = {
    1: 'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-mainnet-v2', //mainnet
    5: 'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-goerli', // goerly
    100: 'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-xdai-v2', // gnosis
    1337: 'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-xdai-v2', //localhost
    42161:
      'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-arbitrum-one-v3', //arbitrum
  };

  let subgraphUrl = networkApiPair[chainId];

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

  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(subgraphUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        setData(await result.data.pairs);
      } catch (err) {
        setError(err.message);
      }
    }

    if (!subgraphUrl) {
      setError('There are no data for this chain');
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, error];
};
