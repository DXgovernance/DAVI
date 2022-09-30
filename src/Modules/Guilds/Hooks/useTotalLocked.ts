import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import useTotalSupplyAt from 'Modules/Guilds/Hooks/useTotalSupplyAt';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import useTotalLockedAt from 'Modules/Guilds/Hooks/useTotalLockedAt';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

const useTotalLocked = (guildAddress: string, snapshotId?: string) => {
  // Hooks call
  const { proposalId } = useTypedParams();
  const { data: _snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const SNAPSHOT_ID = snapshotId ?? _snapshotId?.toString() ?? null;

  const { isSnapshotGuild, isRepGuild } =
    useGuildImplementationType(guildAddress);

  const { data: totalLockedResponse } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'getTotalLocked',
    watch: true,
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

  if (isRepGuild && isSnapshotGuild) {
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
    return SNAPSHOT_ID
      ? {
          data: totalLockedAtProposalSnapshotResponse
            ? BigNumber.from(totalLockedAtProposalSnapshotResponse)
            : undefined,
        }
      : {
          data: totalLockedResponse
            ? BigNumber.from(totalLockedResponse)
            : undefined,
        };
  }
  return {
    data: totalLockedResponse ? BigNumber.from(totalLockedResponse) : undefined,
  };
};

export default useTotalLocked;
