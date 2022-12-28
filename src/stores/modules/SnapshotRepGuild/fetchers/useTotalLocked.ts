import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import useTotalSupplyAt from 'Modules/Guilds/Hooks/useTotalSupplyAt';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useHookStoreProvider } from 'stores';
import { useMatch } from 'react-router-dom';

const useTotalLocked = (guildAddress: string, snapshotId?: string) => {
  console.log('rep guild implementation');
  const {
    hooks: {
      fetchers: { useSnapshotId },
    },
  } = useHookStoreProvider();
  // Hooks call
  const urlParams = useMatch('/:chainName/:guildId/proposal/:proposalId/*');
  const proposalId = urlParams?.params.proposalId as `0x${string}`; // TODO: remove type coercion

  const { data: guildTokenAddress } = useGuildToken(guildAddress);

  const { data: _snapshotId } = useSnapshotId({
    contractAddress: guildTokenAddress,
    proposalId,
  });

  const SNAPSHOT_ID = snapshotId ?? _snapshotId?.toString() ?? null;

  const { loaded } = useGuildImplementationType(guildAddress);

  const { data: totalLockedResponse, refetch } = useContractRead({
    address: loaded ? guildAddress : null,
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
};

export default useTotalLocked;
