import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import useGuildImplementationTypeConfig from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractEvent, useContractRead } from 'wagmi';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';

interface useSnapshotIdProps {
  contractAddress: string;
  proposalId: `0x${string}`;
}

const useSnapshotId = ({ contractAddress, proposalId }: useSnapshotIdProps) => {
  const { isSnapshotGuild } = useGuildImplementationTypeConfig(contractAddress);
  const { data, refetch, ...rest } = useContractRead({
    enabled: isSnapshotGuild,
    address: contractAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'getProposalSnapshotId',
    args: [proposalId],
  });

  useContractEvent({
    address: isSnapshotGuild ? contractAddress : null,
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
