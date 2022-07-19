import { useMemo } from 'react';
import { useProposal } from 'hooks/Guilds/ether-swr/guild/useProposal';
import useSnapshotId from 'hooks/Guilds/ether-swr/guild/useSnapshotId';
import useTotalLocked from 'hooks/Guilds/ether-swr/guild/useTotalLocked';

import { getBigNumberPercentage } from 'utils/bnPercentage';

// Gets vote summary as array of percentages
export default function useVoteSummary(
  guildId: string,
  proposalId: string
): number[] {
  const { data: { totalVotes } = {} } = useProposal(guildId, proposalId);

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildId,
    proposalId,
  });

  const { data: totalLocked } = useTotalLocked(guildId, snapshotId?.toString());

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
