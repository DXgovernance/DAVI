import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import { useContractRead } from 'wagmi';

const useGuildHolderTotal = (guildToken: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildToken,
    contractInterface: ERC20SnapshotRep.abi,
    functionName: 'getTotalHolders',
  });
  return { data: Number(data), ...rest };
};

export default useGuildHolderTotal;
