import { Proposal } from 'types/types.guilds.d';
import { GuildConfigProps } from 'Modules/Guilds/Hooks/useGuildConfig';

export interface ProposalInfoCardProps {
  proposal: Proposal;
  guildConfig: GuildConfigProps;
  quorum: any;
}
