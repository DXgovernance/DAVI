import useTotalLockedAt from 'Modules/Guilds/Hooks/useTotalLockedAt';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useHookStoreProvider } from 'stores';

const useTotalLocked = (guildAddress: string, proposalId?: `0x${string}`) => {
  console.log('ERC20 guild implementation');
  const {
    hooks: {
      fetchers: { useSnapshotId },
    },
    isLoading,
  } = useHookStoreProvider();

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const { loaded } = useGuildImplementationType(guildAddress);

  const { data: totalLockedResponse, refetch } = useContractRead({
    address: !isLoading ? guildAddress : null,
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
        data: totalLockedAtProposalSnapshotResponse
          ? BigNumber.from(totalLockedAtProposalSnapshotResponse)
          : undefined,
      }
    : {
        data: totalLockedResponse
          ? BigNumber.from(totalLockedResponse)
          : undefined,
      };
};

export default useTotalLocked;
