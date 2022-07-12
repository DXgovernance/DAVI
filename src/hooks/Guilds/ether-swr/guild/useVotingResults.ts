import { ERC20Info, useERC20Info } from '../erc20/useERC20Info';
import { useGuildConfig } from './useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { BigNumber } from 'ethers';
import { useProposal } from 'hooks/Guilds/ether-swr/guild/useProposal';
import useSnapshotId from 'hooks/Guilds/ether-swr/guild/useSnapshotId';
import useTotalLocked from 'hooks/Guilds/ether-swr/guild/useTotalLocked';
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
    const options = proposal?.totalVotes
      // .slice(1) // remove the first option -
      .reduce<Record<string, BigNumber>>((acc, result, i) => {
        if (i !== 0) {
          // skip idx 0
          // acc[i + 1] = result; // i + 1 because we skip the first option and idx should start from 1 and we are using
          acc[i] = result;
        }
        return acc;
      }, {});

    return {
      options,
      quorum: data?.votingPowerForProposalExecution,
      totalLocked,
      token: tokenInfo,
    };
  }, [data, proposal, tokenInfo, totalLocked]);

  return voteData;
};
