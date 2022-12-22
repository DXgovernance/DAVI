import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useHookStoreProvider } from 'stores';
import { ERC20Info, useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useTotalLocked from 'Modules/Guilds/Hooks/useTotalLocked';

export interface VoteData {
  options: { [name: string]: BigNumber };
  quorum: BigNumber;
  totalLocked: BigNumber;
  token: ERC20Info;
}

export const useVotingResults = (
  optionalGuildId?: string,
  optionalProposalId?: `0x${string}`
): VoteData => {
  const {
    hooks: { useProposal, useSnapshotId },
  } = useHookStoreProvider();
  const { guildId, proposalId } = useTypedParams();

  // swr hooks
  const { data: proposal } = useProposal(
    optionalGuildId || guildId,
    optionalProposalId || proposalId
  );

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildId,
    proposalId: proposal?.id,
  });

  const { data } = useGuildConfig(
    optionalGuildId || guildId,
    optionalProposalId || proposalId
  );

  const { data: tokenInfo } = useERC20Info(data?.token);

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
