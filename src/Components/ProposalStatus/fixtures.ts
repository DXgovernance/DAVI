import { ContractState } from 'types/types.guilds.d';
import moment from 'moment';
import { ProposalStatusProps } from './types';

export const proposalStatusMock: ProposalStatusProps = {
  endTime: moment(),
  status: ContractState.Active,
  timeDetail: '1 minute ago',
};
