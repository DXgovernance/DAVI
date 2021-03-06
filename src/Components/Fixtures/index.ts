import { ProposalStatusProps } from 'Components/ProposalStatus/types';
import { BigNumber } from 'ethers';
import moment from 'moment';
import { Proposal, ContractState, ProposalState } from 'types/types.guilds.d';
import { ENSAvatar } from '../Types';
import { GuildConfigProps } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';

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
