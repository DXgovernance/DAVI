import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import useTotalSupplyAt from 'Modules/Guilds/Hooks/useTotalSupplyAt';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useTotalLockedAt from 'Modules/Guilds/Hooks/useTotalLockedAt';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useHookStoreProvider } from 'stores';

const useTotalLocked = (guildAddress: string, snapshotId?: string) => {
  // Hooks call
  const {
    hooks: { useSnapshotId },
  } = useHookStoreProvider();

  const { proposalId } = useTypedParams();
  const { data: _snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const SNAPSHOT_ID = snapshotId ?? _snapshotId?.toString() ?? null;

  const { isSnapshotGuild, isRepGuild, loaded } =
    useGuildImplementationType(guildAddress);

  const { data: totalLockedResponse, refetch } = useContractRead({
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getTotalLocked',
  });

  useContractEvent({
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    eventName: 'TokensWithdrawn',
    listener() {
      refetch();
    },
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
  if (!loaded) {
    return {
      data: undefined,
    };
  }
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
