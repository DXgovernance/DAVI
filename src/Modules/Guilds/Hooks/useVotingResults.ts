import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { BigNumber } from 'ethers';
import useProposal from 'Modules/Guilds/Hooks/useProposal';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import useTotalLocked from 'Modules/Guilds/Hooks/useTotalLocked';
import { useMemo } from 'react';
import { ERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
export interface VoteData {
  options?: { [name: string]: BigNumber };
  totalLocked: BigNumber;
  quorum?: BigNumber;
  token?: ERC20Info;
}

export const useVotingResults = (
  optionalGuildId?: string,
  optionalProposalId?: string
): VoteData => {
  const { guildId, proposalId } = useTypedParams();

  const { data: proposal } = useProposal(
    optionalGuildId || guildId,
    optionalProposalId || proposalId
  );

  const { data: snapshotId } = useSnapshotId({
    contractAddress: optionalGuildId || guildId,
    proposalId: optionalProposalId || proposalId,
  });

  const { data: totalLocked } = useTotalLocked(guildId, snapshotId?.toString());

  const voteData = useMemo(() => {
    if (!proposal) return undefined;
    const options = proposal?.totalVotes.reduce<Record<string, BigNumber>>(
      (acc, result, i) => {
        acc[i] = result;
        return acc;
      },
      {}
    );

    return {
      options,
      totalLocked,
    };
  }, [proposal, totalLocked]);

  return voteData;
};
