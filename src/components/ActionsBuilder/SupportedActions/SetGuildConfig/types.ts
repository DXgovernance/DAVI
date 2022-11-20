import { BigNumber } from 'ethers';

export interface SetGuildConfigFields {
  proposalTime: BigNumber;
  timeForExecution: BigNumber;
  votingPowerPercentageForProposalExecution: BigNumber;
  votingPowerPercentageForProposalCreation: BigNumber;
  voteGas: BigNumber;
  maxGasPrice: BigNumber;
  maxActiveProposals: BigNumber;
  lockTime: BigNumber;
  minimumMembersForProposalCreation: BigNumber;
  minimumTokensLockedForProposalCreation: BigNumber;
}

export enum FieldType {
  duration = 'duration',
  number = 'number',
  percentage = 'percentage',
}
export interface Field {
  name: string;
  label: string;
  type: FieldType;
}

export type ControlField =
  | 'votingPowerPercentageForProposalExecution'
  | 'votingPowerPercentageForProposalCreation'
  | 'voteGas'
  | 'maxGasPrice'
  | 'maxActiveProposals'
  | 'minimumMembersForProposalCreation'
  | 'minimumTokensLockedForProposalCreation'
  | 'proposalTime'
  | 'timeForExecution'
  | 'lockTime';
