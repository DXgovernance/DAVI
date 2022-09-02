import { ERC20Info, useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useGuildConfig } from './useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { BigNumber } from 'ethers';
import { useProposal } from 'Modules/Guilds/Hooks/useProposal';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import useTotalLocked from 'Modules/Guilds/Hooks/useTotalLocked';
import { useMemo } from 'react';

export interface VoteData {
  options: { [name: string]: BigNumber };
  quorum: BigNumber;
  totalLocked: BigNumber;
  token: ERC20Info;
}

export const useVotingResults = (
  optionalGuildId?: string,
  optionalProposalId?: string
): VoteData => {
  const { guildId, proposalId } = useTypedParams();

  // swr hooks
  const { data: proposal } = useProposal(
    optionalGuildId || guildId,
    optionalProposalId || proposalId
  );

  const { data } = useGuildConfig(optionalGuildId || guildId);
  const { data: tokenInfo } = useERC20Info(data?.token);

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildId,
    proposalId: proposal?.id,
  });

  const { data: totalLocked } = useTotalLocked(guildId, snapshotId?.toString());

  const voteData = useMemo(() => {
    if (!proposal || !data || !tokenInfo) return undefined;
    const options = proposal?.totalVotes.reduce<Record<string, BigNumber>>(
      (acc, result, i) => {
        acc[i] = result;
        return acc;
      },
      {}
    );

    return {
      options,
      quorum: data?.votingPowerForProposalExecution,
      totalLocked,
      token: tokenInfo,
    };
  }, [data, proposal, tokenInfo, totalLocked]);

  return voteData;
};
