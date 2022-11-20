import { ProposalState } from 'types/types.guilds.d';
import moment from 'moment';
import { ProposalStatusProps } from './types';

export const proposalStatusMock: ProposalStatusProps = {
  status: ProposalState.Active,
  endTime: { detail: '1 hour ago', moment: moment().add(1, 'hour') },
};
