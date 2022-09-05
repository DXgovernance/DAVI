import { Moment } from 'moment';
import { ProposalState } from 'types/types.guilds';

export interface ProposalStatusProps {
  endTime: Moment;
  status: ProposalState;
  bordered?: boolean;
  hideTime?: boolean;
  timeDetail?: string;
  guildId?: string;
}

export interface TimeDetailProps {
  endTime: Moment;
  timeDetail?: string;
  status: ProposalState;
  guildId?: string;
}
