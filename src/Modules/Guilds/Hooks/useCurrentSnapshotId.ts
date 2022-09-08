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
  return useContractRead({
    enabled: isSnapshotGuild,
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'getCurrentSnapshotId',
  });
};

export default useCurrentSnapshotId;
