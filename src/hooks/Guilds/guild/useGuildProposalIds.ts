import useEtherSWR from '../ether-swr/useEtherSWR';
import ERC20GuildContract from 'contracts/ERC20Guild.json';

export const useGuildProposalIds = (guildId: string) =>
  useEtherSWR<string[]>([guildId, 'getProposalsIds'], {
    ABIs: new Map([[guildId, ERC20GuildContract.abi]]),
  });
