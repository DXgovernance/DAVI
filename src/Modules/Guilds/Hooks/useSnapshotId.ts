import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import useGuildImplementationTypeConfig from 'Modules/Guilds/Hooks/useGuildImplementationType';
import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import { useContractRead } from 'wagmi';

interface useSnapshotIdProps {
  contractAddress: string;
  proposalId: string;
}

const useSnapshotId = ({ contractAddress, proposalId }: useSnapshotIdProps) => {
  const { isSnapshotGuild } = useGuildImplementationTypeConfig(contractAddress);
  const { data, ...rest } = useContractRead({
    enabled: isSnapshotGuild,
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'getProposalSnapshotId(bytes32)',
    args: [proposalId],
  });

  return useMemo(() => {
    return {
      data: data ? BigNumber.from(data) : null,
      ...rest,
    };
  }, [data, rest]);
};

export default useSnapshotId;
