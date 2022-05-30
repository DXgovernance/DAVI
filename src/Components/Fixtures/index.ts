import { BigNumber } from 'ethers';
import moment from 'moment';
import { Proposal, ContractState } from 'types/types.guilds.d';
import { ENSAvatar } from '../Types';

export const proposalMock: Proposal = {
  id: '0x1234567890123456789012345678901234567890',
  title: 'SWPR single reward campaign',
  contentHash: '0x1234567890123456789012345678901234567890',
  creator: '0x1234567890123456789012345678901234567890',
  data: [],
  to: [],
  value: [],
  startTime: moment(),
  endTime: moment(),
  contractState: ContractState.Active,
  totalActions: BigNumber.from(0),
  totalVotes: [],
};

// TODO: Move this to the ENSAvatar fixture file once that's refactored
export const ensAvatarMock: ENSAvatar = {
  ensName: 'venky0x.eth',
};

export const proposalStatusPropsMock = {
  timeDetail: 'Time',
  status: ContractState.Active,
  endTime: moment('2022-05-09T08:00:00'),
};
