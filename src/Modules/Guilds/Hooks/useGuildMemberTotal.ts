import BaseERC20Guild from 'contracts/BaseERC20Guild.json';
import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';
import { useContractEvent, useContractRead } from 'wagmi';

const useGuildMemberTotal = (
  guildAddress: string,
  guildToken: string,
  isRepGuild: boolean
) => {
  const contractInterface = isRepGuild
    ? ERC20SnapshotRep.abi
    : BaseERC20Guild.abi;
  const functionName = isRepGuild ? 'getTotalHolders' : 'getTotalMembers';
  const addressOrName = isRepGuild ? guildToken : guildAddress;

  const { data, refetch, ...rest } = useContractRead({
    addressOrName: addressOrName,
    contractInterface: contractInterface,
    functionName: functionName,
  });

  useContractEvent({
    addressOrName: guildToken,
    contractInterface: ERC20SnapshotRep.abi,
    eventName: 'Transfer',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    addressOrName: guildAddress,
    contractInterface: BaseERC20Guild.abi,
    eventName: 'TokensWithdrawn',
    listener() {
      refetch();
    },
  });

  return { data: Number(data), refetch, ...rest };
};

export default useGuildMemberTotal;
