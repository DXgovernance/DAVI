import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import useTotalSupplyAt from 'Modules/Guilds/Hooks/useTotalSupplyAt';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useHookStoreProvider } from 'stores';

const useTotalLocked = (guildAddress: string, proposalId?: `0x${string}`) => {
  console.log('rep guild implementation');
  const {
    hooks: {
      fetchers: { useSnapshotId },
    },
  } = useHookStoreProvider();

  const { data: guildTokenAddress } = useGuildToken(guildAddress);

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildTokenAddress,
    proposalId,
  });

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
    snapshotId: snapshotId?.toString() ?? null,
  });

  // Return response based on implementation type
  if (!loaded) {
    return {
      data: undefined,
    };
  }
  return snapshotId?.toString()
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
