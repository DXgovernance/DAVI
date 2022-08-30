import { ProposalStatusProps } from 'components/ProposalStatus/types';
import { BigNumber } from 'ethers';
import moment from 'moment';
import { Proposal, ContractState, ProposalState } from 'types/types.guilds.d';
import { ENSAvatar } from 'types/types.guilds';
import { GuildConfigProps } from 'hooks/Guilds/guild/useGuildConfig';
import {
  Call,
  DecodedAction,
  DecodedCall,
  Option,
  SupportedAction,
} from 'components/ActionsBuilder/types';

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
  timeDetail: '',
  contractState: ContractState.Active,
  totalActions: BigNumber.from(0),
  totalVotes: [],
};

// TODO: Move this to the ENSAvatar fixture file once that's refactored
export const ensAvatarMock: ENSAvatar = {
  ensName: 'venky0x.eth',
};

export const proposalStatusPropsMock: ProposalStatusProps = {
  timeDetail: 'Time',
  status: ProposalState.Active,
  endTime: moment('2022-05-09T08:00:00'),
};

export const guildConfigMock: GuildConfigProps = {
  name: 'TESTGuild',
  token: '0xB58b358Be2B16Cb8992fc7340F92127083de33cE',
  permissionRegistry: '0x8164f9f291c50A133b23aFcB800da15dBB954b22',
  proposalTime: BigNumber.from(180),
  timeForExecution: BigNumber.from(999),
  maxActiveProposals: BigNumber.from(999),
  votingPowerForProposalCreation: BigNumber.from(500000000000000),
  votingPowerForProposalExecution: BigNumber.from(3000000000000000),
  tokenVault: '0xEE945a0fa35b2B9046D244e465861221c766069F',
  lockTime: BigNumber.from(300),
};

export const actionMock: Call = {
  from: '0x0000000000000000000000000000000000000000',
  to: '',
  data: '0x2e1a7d4d00000000000000000000000000000000000000000000000001aa0b0f33c98800',
  value: BigNumber.from('1000000000000000000'),
};

export const decodedCallMock: DecodedCall = {
  from: '0x140d68e4E3f80cdCf7036De007b3bCEC54D38b1f',
  callType: SupportedAction.ERC20_TRANSFER,
  function: null,
  to: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
  value: BigNumber.from(0),
  args: {
    _to: '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa',
    _value: BigNumber.from(150),
  },
};

export const decodedActionMock: DecodedAction = {
  id: 'action-0.3476768528404657',
  decodedCall: decodedCallMock,
  contract: null,
  approval: null,
};

export const optionsMock: Option = {
  id: 'option-1',
  label: 'For',
  color: '#295FF4',
  actions: [actionMock],
  decodedActions: [decodedActionMock],
  totalVotes: BigNumber.from(3),
  votePercentage: 50,
};

export const optionsWithSeveralActionsMock: Option = {
  id: 'option-1',
  label: 'For',
  color: '#295FF4',
  actions: [actionMock, actionMock],
  decodedActions: [decodedActionMock, decodedActionMock],
  totalVotes: BigNumber.from(3),
  votePercentage: 50,
};
