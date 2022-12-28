import useTotalLockedAt from 'Modules/Guilds/Hooks/useTotalLockedAt';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useHookStoreProvider } from 'stores';
import { useMatch } from 'react-router-dom';

const useTotalLocked = (guildAddress: string, snapshotId?: string) => {
  console.log('ERC20 guild implementation');
  const {
    hooks: {
      fetchers: { useSnapshotId },
    },
    isLoading,
  } = useHookStoreProvider();
  // Hooks call
  const urlParams = useMatch('/:chainName/:guildId/proposal/:proposalId/*');
  const proposalId = urlParams?.params.proposalId as `0x${string}`; // TODO: remove type coercion

  const { data: _snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const SNAPSHOT_ID = snapshotId ?? _snapshotId?.toString() ?? null;

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
