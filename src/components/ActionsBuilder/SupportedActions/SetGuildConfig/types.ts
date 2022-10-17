import { BigNumber } from 'ethers';

export interface SetGuildConfigEditorProps {
  asset: string;
  to: string;
  functionSignature: string;
  valueAllowed: BigNumber;
  allowance: boolean;
  functionName: string;
  tab?: number;
}

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
