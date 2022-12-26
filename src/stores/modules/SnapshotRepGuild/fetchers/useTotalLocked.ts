import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import useTotalSupplyAt from 'Modules/Guilds/Hooks/useTotalSupplyAt';
import { BigNumber } from 'ethers';
import { useHookStoreProvider } from 'stores';
import { useMatch } from 'react-router';

const useTotalLocked = (guildAddress: string, snapshotId?: string) => {
  // Hooks call
  const {
    hooks: {
      fetchers: { useSnapshotId },
    },
  } = useHookStoreProvider();

  const urlParams = useMatch('/:chainName/:guildId/proposal/:proposalId/*');
  const proposalId = urlParams?.params.proposalId as `0x${string}`; // TODO: remove type coercion

  const { data: _snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const SNAPSHOT_ID = snapshotId ?? _snapshotId?.toString() ?? null;

  const { data: guildTokenAddress } = useGuildToken(guildAddress);

  const { data: totalSupplyAtSnapshotResponse } = useTotalSupplyAt({
    contractAddress: guildTokenAddress,
    snapshotId: SNAPSHOT_ID,
  });

  return {
    data: totalSupplyAtSnapshotResponse
      ? BigNumber.from(totalSupplyAtSnapshotResponse)
      : undefined,
  };
};

export default useTotalLocked;
