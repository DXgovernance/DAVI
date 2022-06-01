import { Proposal } from 'types/types.guilds.d';
import { GuildConfigProps } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';

export interface ProposalInfoCardProps {
  proposal: Proposal;
  guildConfig: GuildConfigProps;
  quorum: any;
  t: any;
}
