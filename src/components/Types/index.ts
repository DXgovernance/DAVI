import { BigNumber } from 'ethers';
import { Moment } from 'moment';

export enum ProposalState {
  Active = 'Active',
  Rejected = 'Rejected',
  Executed = 'Executed',
  Failed = 'Failed',
  Finished = 'Finished',
}

export enum ContractState {
  Active = 'Active',
  Rejected = 'Rejected',
  Executed = 'Executed',
  Failed = 'Failed',
}

export interface Proposal {
  id: string;
  creator: string;
  startTime: Moment;
  endTime: Moment;
  to: string[];
  data: string[];
  value: BigNumber[];
  totalActions: BigNumber;
  title: string;
  contentHash: string;
  contractState: ContractState;
  totalVotes: BigNumber[];
}

// TODO: Move this to the ENSAvatar types file once that's refactored
export interface ENSAvatar {
  imageUrl?: string;
  ensName?: string;
}
