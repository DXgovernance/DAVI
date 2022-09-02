import useGuildImplementationTypeConfig from 'Modules/Guilds/Hooks/useGuildImplementationType';
import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import { useContractRead } from 'wagmi';

interface useCurrentSnapshotIdProps {
  contractAddress: string;
}

const useCurrentSnapshotId = ({
  contractAddress,
}: useCurrentSnapshotIdProps) => {
  const { isSnapshotGuild } = useGuildImplementationTypeConfig(contractAddress);
  const { data, ...rest } = useContractRead({
    enabled: isSnapshotGuild,
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'getCurrentSnapshotId',
  });
  return {
    data,
    ...rest,
  };
};

export default useCurrentSnapshotId;
