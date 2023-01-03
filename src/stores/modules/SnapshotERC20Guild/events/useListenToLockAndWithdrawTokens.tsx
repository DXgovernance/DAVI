import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { useContractEvent } from 'wagmi';

export const useListenToLockAndWithdrawTokens = (
  daoId: string,
  refetch: () => void
) => {
  useContractEvent({
    address: daoId,
    abi: SnapshotERC20Guild.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    address: daoId,
    abi: SnapshotERC20Guild.abi,
    eventName: 'TokensWithdrawn',
    listener() {
      refetch();
    },
  });
};
