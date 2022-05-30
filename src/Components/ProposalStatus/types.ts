import { Moment } from 'moment';
import { ContractState } from 'types/types.guilds';

export interface ProposalStatusProps {
  endTime: Moment;
  status: ContractState;
  bordered?: boolean;
  hideTime?: boolean;
  timeDetail?: string;
}
