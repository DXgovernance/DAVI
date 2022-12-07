import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import { useContractEvent, useContractReads } from 'wagmi';

const useGuildMemberTotal = (
  guildAddress: `0x${string}`,
  guildToken: `0x${string}`,
  isRepGuild: boolean
) => {
  const repGuildContractParams = {
    address: guildToken,
    abi: ERC20SnapshotRep.abi,
    functionName: 'getTotalHolders',
  };

  const baseERC20ContractParams = {
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getTotalMembers',
  };

  // We can't call different contracts conditionally in useContractRead
  // so we pass an array of only one contract
  const contractArray = [];
  if (isRepGuild) contractArray.push(repGuildContractParams);
  else contractArray.push(baseERC20ContractParams);

  const { data, refetch, ...rest } = useContractReads({
    contracts: contractArray,
  });

  // REP guild event

  useContractEvent({
    address: isRepGuild ? guildToken : null,
    abi: ERC20SnapshotRep.abi,
    eventName: 'Transfer',
    listener() {
      refetch();
    },
  });

  // ERC20 guild events

  useContractEvent({
    address: !isRepGuild ? guildAddress : null,
    abi: BaseERC20Guild.abi,
    eventName: 'TokensLocked',
    listener() {
      refetch();
    },
  });

  useContractEvent({
    address: !isRepGuild ? guildAddress : null,
    abi: BaseERC20Guild.abi,
    eventName: 'TokensWithdrawn',
    listener() {
      refetch();
    },
  });

  return { data: Number(data), refetch, ...rest };
};

export default useGuildMemberTotal;
