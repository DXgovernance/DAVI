import useCurrentSnapshotId from './useCurrentSnapshotId';
import useGuildToken from './useGuildToken';
import useTotalSupplyAt from './useTotalSupplyAt';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import useSnapshotId from 'hooks/Guilds/guild/useSnapshotId';
import useTotalLockedAt from 'hooks/Guilds/guild/useTotalLockedAt';
import useGuildImplementationType from 'hooks/Guilds/guild/useGuildImplementationType';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

const useTotalLocked = (guildAddress: string, snapshotId?: string) => {
  // Hooks call
  const { data: currentSnapshotId } = useCurrentSnapshotId({
    contractAddress: guildAddress,
  });

  const { proposalId } = useTypedParams();
  const { data: _snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const SNAPSHOT_ID =
    snapshotId ?? _snapshotId?.toString() ?? currentSnapshotId?.toString();

  const { isSnapshotGuild, isRepGuild } =
    useGuildImplementationType(guildAddress);

  const { data: totalLockedResponse } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'getTotalLocked',
  });

  const { data: totalLockedAtProposalSnapshotResponse } = useTotalLockedAt({
    contractAddress: guildAddress,
    snapshotId: SNAPSHOT_ID,
  });

  const { data: guildTokenAddress } = useGuildToken(guildAddress);

  const { data: totalSupplyAtSnapshotResponse } = useTotalSupplyAt({
    contractAddress: guildTokenAddress,
    snapshotId: SNAPSHOT_ID,
  });

  // Return response based on implementation type
  if (isRepGuild) {
    return SNAPSHOT_ID
      ? {
          data: totalSupplyAtSnapshotResponse
            ? BigNumber.from(totalSupplyAtSnapshotResponse)
            : undefined,
        }
      : {
          data: totalLockedResponse
            ? BigNumber.from(totalLockedResponse)
            : undefined,
        };
  }

  if (isSnapshotGuild) {
    return {
      data: totalLockedAtProposalSnapshotResponse
        ? BigNumber.from(totalLockedAtProposalSnapshotResponse)
        : undefined,
    };
  }
  // if (isRepGuild) return totalLockedResponse;
  return {
    data: totalLockedResponse ? BigNumber.from(totalLockedResponse) : undefined,
  };
};

export default useTotalLocked;
