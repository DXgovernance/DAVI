import ERC20Guild from 'contracts/ERC20Guild.json';
import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import { useContractRead } from 'wagmi';

const useGuildMemberTotal = (
  guildAddress: string,
  guildToken: string,
  isRepGuild: boolean
) => {
  const contractInterface = isRepGuild ? ERC20SnapshotRep.abi : ERC20Guild.abi;
  const functionName = isRepGuild ? 'getTotalHolders' : 'getTotalMembers';
  const addressOrName = isRepGuild ? guildToken : guildAddress;

  const { data, ...rest } = useContractRead({
    addressOrName: addressOrName,
    contractInterface: contractInterface,
    functionName: functionName,
  });

  return { data: Number(data), ...rest };
};

export default useGuildMemberTotal;
