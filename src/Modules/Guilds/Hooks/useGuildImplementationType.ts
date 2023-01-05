import { GuildImplementationType } from 'types/types.guilds.d';
import { useHookStoreProvider } from 'stores';

interface ImplementationTypeConfig {
  type: string;
  features: string[];
}

interface ImplementationTypeConfigReturn extends ImplementationTypeConfig {
  isRepGuild: boolean;
  isSnapshotGuild: boolean;
  loaded?: boolean;
}

/*
  The loading logic will only live on the store.
  What this hook does is query what the store has, and returns that,
  as a temporary solution.
  The next step will be to replace the instances where this hook is
  used for calls to the store.
*/

// TODO: replace components using this hook with calls to the store, then delete the hook

export default function useGuildImplementationTypeConfig(
  guildAddress: string
): ImplementationTypeConfigReturn {
  const { isLoading, capabilities, name } = useHookStoreProvider();

  let type: GuildImplementationType;

  switch (name) {
    case 'SnapshotERC20Guild':
      type = GuildImplementationType.SnapshotERC20Guild;
      break;
    case 'SnapshotRepGuild':
      type = GuildImplementationType.SnapshotRepERC20Guild;
      break;
    default:
      break;
  }

  return {
    type,
    features: [],

    isRepGuild: capabilities.votingPower === 'soulbound' ? true : false,
    isSnapshotGuild:
      capabilities.votingPowerTally === 'snapshot' ? true : false,
    loaded: !isLoading,
  };
}
