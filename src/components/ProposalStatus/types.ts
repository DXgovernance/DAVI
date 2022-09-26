// import { Moment } from 'moment';
import { Moment } from 'moment';
import { ProposalState } from 'types/types.guilds';

export interface ProposalStatusProps {
  status: ProposalState;
  endTime: { detail: string; moment: Moment };
  bordered?: boolean;
  hideTime?: boolean;
}

export interface TimeDetailProps {
  endTime: { detail: string; moment: Moment };
}
