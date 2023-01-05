import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useContractEvent, useContractRead } from 'wagmi';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { useHookStoreProvider } from 'stores';

interface useSnapshotIdProps {
  contractAddress: string;
  proposalId: `0x${string}`;
}

export const useSnapshotId = ({
  contractAddress,
  proposalId,
}: useSnapshotIdProps) => {
  const {
    capabilities: { votingPowerTally },
  } = useHookStoreProvider();

  const { data, refetch, ...rest } = useContractRead({
    enabled: votingPowerTally === 'snapshot',
    address: contractAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'getProposalSnapshotId',
    args: [proposalId],
  });

  useContractEvent({
    address: votingPowerTally === 'snapshot' ? contractAddress : null,
    abi: SnapshotERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener(node, label, eventDetails) {
      const eventProposalId = eventDetails.args[0];
      if (eventProposalId === proposalId) refetch();
    },
  });

  return useMemo(() => {
    return {
      data: data ? BigNumber.from(data) : null,
      ...rest,
    };
  }, [data, rest]);
};

export default useSnapshotId;
