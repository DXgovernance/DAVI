import { BigNumber } from 'ethers';
import useEtherSWR from '../ether-swr/useEtherSWR';
import useCurrentSnapshotId from './useCurrentSnapshotId';
import useGuildToken from './useGuildToken';
import useTotalSupplyAt from './useTotalSupplyAt';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import useSnapshotId from 'hooks/Guilds/guild/useSnapshotId';
import useTotalLockedAt from 'hooks/Guilds/guild/useTotalLockedAt';
import useGuildImplementationType from 'hooks/Guilds/guild/useGuildImplementationType';

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

  const totalLockedResponse = useEtherSWR<BigNumber>(
    guildAddress ? [guildAddress, 'getTotalLocked'] : [],
    {
      ABIs: new Map([[guildAddress, ERC20GuildContract.abi]]),
      refreshInterval: 0,
    }
  );
  const totalLockedAtProposalSnapshotResponse = useTotalLockedAt({
    contractAddress: guildAddress,
    snapshotId: SNAPSHOT_ID,
  });

  const { data: guildTokenAddress } = useGuildToken(guildAddress);

  const totalSupplyAtSnapshotResponse = useTotalSupplyAt({
    contractAddress: guildTokenAddress,
    snapshotId: SNAPSHOT_ID,
  });

  // Return response based on implementation type
  if (isRepGuild)
    return SNAPSHOT_ID ? totalSupplyAtSnapshotResponse : totalLockedResponse;
  if (isSnapshotGuild) return totalLockedAtProposalSnapshotResponse;
  // if (isRepGuild) return totalLockedResponse;
  return totalLockedResponse;
};

export default useTotalLocked;
