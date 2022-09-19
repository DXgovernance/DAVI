// import { Moment } from 'moment';
import { ProposalState } from 'types/types.guilds';

export interface ProposalStatusProps {
  status: ProposalState;
  bordered?: boolean;
  hideTime?: boolean;
  endTimeMoment: moment.Moment;
  endTimeDetail: string;
}

export interface TimeDetailProps {
  endTimeMoment: moment.Moment;
  endTimeDetail: string;
}
