import { Moment } from 'moment';
import RootContext from '../contexts';

interface SwaprPairDataInterface {
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

export default class SubgraphService {
  context: RootContext;

  constructor(context: RootContext) {
    this.context = context;
  }

  async dailyTokenPrice(token: string, from: Moment, to: Moment) {
    const oneDay = 86400;
    const subgraphUrl =
      'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-xdai-v2';

    const timestamps = getTimestampsFromRange(from, to, oneDay);
    const blocks = await getBlocksFromTimestamps(timestamps);
    if (blocks.length === 0) return [];

    const query = `
        query dailyTokenPrice {
          ${blocks.map(block => {
            return `t${
              block.timestamp
            }: token(id: "${token.toLowerCase()}", block: { number: ${
              block.number
            } }) {
              derivedNativeCurrency
            }`;
          })} 
        }
      `;

    let data = await (
      await fetch(subgraphUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
    ).json();

    return data;
  }

  async getSwaprPairs(
    lowerTimeLimit: number,
    userId: string,
    pageSize: number,
    lastId: string
  ): Promise<SwaprPairDataInterface[]> {
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
  }
}

export const getTimestampsFromRange = (
  from: Moment,
  to: Moment,
  granularity: number
): number[] => {
  let loopedDate = from;
  let timestamps = [];
  while (loopedDate.valueOf() < to.valueOf()) {
    timestamps.push(loopedDate.valueOf());
    loopedDate = loopedDate.add(granularity, 'seconds');
  }
  return timestamps;
};

// THIS SHOULD ONLY BE USED FOR NON CRITICAL DATA DUE TO RELIANCE ON SUBGRAPH
export const getBlocksFromTimestamps = async (
  timestamps: number[]
): Promise<{ number: number; timestamp: number }[]> => {
  if (!timestamps || timestamps.length === 0) return [];

  const blocksSubgraph =
    'https://api.thegraph.com/subgraphs/name/1hive/xdai-blocks';

  const promises = timestamps.map(async timestamp => {
    const query = `
    query blocks {
        t${timestamp}: blocks(
          first: 1
          orderBy: number
          orderDirection: asc
          where: { timestamp_gt: ${Math.floor(timestamp / 1000)} }
        ) {
        number
      }
    }
  `;

    return (
      await fetch(blocksSubgraph, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
    ).json();
  });

  return (await Promise.all(promises)).reduce(
    (accumulator: { timestamp: number; number: number }[], result: any) => {
      if (result) {
        const { data } = result;
        for (const [timestampString, blocks] of Object.entries(data)) {
          accumulator.push({
            timestamp: parseInt(timestampString.substring(1)),
            number: parseInt(blocks[0].number),
          });
        }
      }
      return accumulator;
    },
    []
  );
};
