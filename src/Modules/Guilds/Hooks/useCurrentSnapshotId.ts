import useGuildImplementationTypeConfig from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useContractEvent, useContractRead } from 'wagmi';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';

interface useCurrentSnapshotIdProps {
  contractAddress: string;
}

const useCurrentSnapshotId = ({
  contractAddress,
}: useCurrentSnapshotIdProps) => {
  const { isSnapshotGuild } = useGuildImplementationTypeConfig(contractAddress);
  const { data, refetch, ...rest } = useContractRead({
    enabled: isSnapshotGuild,
    address: contractAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'getCurrentSnapshotId',
  });

  useContractEvent({
    address: isSnapshotGuild ? contractAddress : null,
    abi: SnapshotERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener(node, label, owner) {
      debugger;
      refetch();
    },
  });

  return { data, refetch, ...rest };
};

export default useCurrentSnapshotId;
