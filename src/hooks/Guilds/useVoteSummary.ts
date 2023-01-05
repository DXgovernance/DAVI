import { useMemo } from 'react';
import { useHookStoreProvider } from 'stores';

import { getBigNumberPercentage } from 'utils/bnPercentage';

// Gets vote summary as array of percentages
export default function useVoteSummary(
  guildId: string,
  proposalId: `0x${string}`
): number[] {
  const {
    hooks: {
      fetchers: { useProposal, useTotalLocked },
    },
  } = useHookStoreProvider();
  const { data: { totalVotes } = {} } = useProposal(guildId, proposalId);

  const { data: totalLocked } = useTotalLocked(guildId, proposalId);

  const votes = useMemo(() => {
    if (totalVotes && totalLocked) {
      const newVotes = [];
      for (var i = 0; i <= totalVotes?.length - 1; i++) {
        if (totalVotes[i]?.gt(0)) {
          newVotes.push(getBigNumberPercentage(totalVotes[i], totalLocked, 2));
        } else {
          newVotes.push(0);
        }
      }
      return newVotes;
    } else {
      return [];
    }
  }, [totalVotes, totalLocked]);

  return votes;
}
