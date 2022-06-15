import React from 'react';
import { formatProposal } from './useProposal';
import { useSWRConfig } from 'swr';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';

import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { getContract } from 'utils/contracts';

export const useProposals = (
  guildAddress: string,
  ids: string[] = [],
  matchers: any[] = []
) => {
  const [proposals, setProposals] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { library } = useWeb3React();
  const { cache } = useSWRConfig();

  const provider = new providers.Web3Provider(library.currentProvider);
  const guild = getContract(guildAddress, ERC20GuildContract.abi, provider);

  const match = proposal => matchers.some(fn => fn(proposal, filter));

  React.useEffect(() => {
    const fetch = async () => {
      setProposals([]);
      setLoading(true);
      ids.forEach((id, index) => {
        const cacheKey = JSON.stringify([guildAddress, 'getProposal', id]);
        const cachedProposal = cache.get(cacheKey);
        if (cachedProposal) {
          match(cachedProposal) &&
            setProposals(proposals => [...proposals, cachedProposal]);
        } else {
          guild.getProposal(id).then(p => {
            const proposal = { ...formatProposal(p), id };
            if (match(proposal)) {
              setProposals(proposals => [...proposals, proposal]);
              cache.set(cacheKey, proposal);
            }
          });
        }

        if (index === ids.length - 1) {
          setLoading(false);
        }
      });
    };
    fetch();
  }, [filter, ids]); // eslint-disable-line

  return React.useMemo(() => {
    return { proposals, setFilter, filter, loading };
  }, [proposals, loading]); // eslint-disable-line
};

// ------------------> Common Matchers
export const matchTitle = (proposal, filter) => {
  if (proposal?.title) {
    let reg = new RegExp('w*' + filter + 'w*', 'gi');
    return proposal.title.match(reg)?.length;
  }
  return null;
};

export const matchCreatorAddress = (proposal, filter) => {
  if (proposal?.creator) {
    let reg = new RegExp('w*' + filter + 'w*', 'gi');
    return proposal.creator.match(reg)?.length;
  }
  return null;
};

export const matchRecipientAddresses = (proposal, filter) => {
  if (proposal?.to) {
    let reg = new RegExp('w*' + filter + 'w*', 'gi');
    return proposal.to?.some(address => address.match(reg)?.length);
  }
  return null;
};
