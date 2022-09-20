import { Moment } from 'moment';
import {
  BigNumber
} from 'ethers';
export interface Proposal {
  id: string;
  creator: string; 
  startTime: Moment;
  endTime: Moment;
  timeDetail: string | null;
  to: string[];
  data?: string[];
  value: BigNumber[];
  totalActions: BigNumber; // Not used in the codebase but in the deploy scripts
  title: string;
  contentHash: string;
  contractState: ContractState;
  totalVotes: BigNumber[];
}

export type InitialProposal = Partial<Proposal> & {
  state: number
}

export enum ProposalState {
  Active = 'Active',
  Executable = 'Executable',
  Executed = 'Executed',
  Rejected = 'Rejected',
  Failed = 'Failed',
  Finished = 'Finished', 
}

export enum ContractState {
  Active = 'Active',
  Rejected = 'Rejected',
  Executed = 'Executed',
  Failed = 'Failed',
}
export interface ProposalMetadata {
  description: string;
  voteOptions: string[];
}
export interface Transaction {
  hash: string
  from: string
  summary?: string
  receipt?: {
    transactionHash: string,
    blockNumber: number,
    status: number,
  }
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
}

export enum GuildImplementationType {
  SnapshotRepERC20Guild = 'SnapshotRepERC20Guild',
  SnapshotERC20Guild = 'SnapshotERC20Guild',
  DXDGuild = 'DXDGuild',
  ERC20Guild = 'ERC20Guild',
  IERC20Guild = 'IERC20Guild',
}

export interface ENSAvatar {
  imageUrl?: string;
  ensName?: string;
}
