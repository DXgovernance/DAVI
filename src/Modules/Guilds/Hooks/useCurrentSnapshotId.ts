import useGuildImplementationTypeConfig from 'Modules/Guilds/Hooks/useGuildImplementationType';
import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';
import { getProposalStateFromEvent } from 'utils/event';
import { ContractState } from 'types/types.guilds.d';

interface useCurrentSnapshotIdProps {
  contractAddress: string;
}

const useCurrentSnapshotId = ({
  contractAddress,
}: useCurrentSnapshotIdProps) => {
  const { isSnapshotGuild } = useGuildImplementationTypeConfig(contractAddress);
  const { data, refetch, ...rest } = useContractRead({
    enabled: isSnapshotGuild,
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'getCurrentSnapshotId',
  });

  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener(event) {
      const proposalState = getProposalStateFromEvent(event);
      if (proposalState === ContractState.Active) refetch();
    },
  });

  return { data, refetch, ...rest };
};

export default useCurrentSnapshotId;
