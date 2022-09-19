import { ProposalState } from 'types/types.guilds.d';
import moment from 'moment';
import { ProposalStatusProps } from './types';

export const proposalStatusMock: ProposalStatusProps = {
  status: ProposalState.Active,
  endTimeDetail: '1 hour ago',
  endTimeMoment: moment().add(1, 'hour'),
};
