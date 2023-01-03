import { useContractEvent } from 'wagmi';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';

export const useListenToTokenTransfer = (
  daoId: string,
  refetch: () => void
) => {
  useContractEvent({
    address: daoId,
    abi: ERC20SnapshotRep.abi,
    eventName: 'Transfer',
    listener() {
      refetch();
    },
  });
};
