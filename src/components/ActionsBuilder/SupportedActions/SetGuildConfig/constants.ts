import { Field, FieldType } from './types';

export const FIELDS: Field[] = [
  { name: 'proposalTime', label: 'Proposal time', type: FieldType.duration },
  {
    name: 'timeForExecution',
    label: 'Time for execution',
    type: FieldType.duration,
  },
  {
    name: 'votingPowerPercentageForProposalExecution',
    label: 'Voting power percentage for proposal execution',
    type: FieldType.percentage,
  },
  {
    name: 'votingPowerPercentageForProposalCreation',
    label: 'Voting power percentage for proposal creation',
    type: FieldType.percentage,
  },
  { name: 'voteGas', label: 'Vote gas', type: FieldType.number },
  { name: 'maxGasPrice', label: 'Max gas price', type: FieldType.number },
  {
    name: 'maxActiveProposals',
    label: 'Max active proposals',
    type: FieldType.number,
  },
  { name: 'lockTime', label: 'Lock time', type: FieldType.duration },
  {
    name: 'minimumMembersForProposalCreation',
    label: 'Minimum members for proposal creation',
    type: FieldType.number,
  },
  {
    name: 'minimumTokensLockedForProposalCreation',
    label: 'Minimum tokens locked for proposal creation',
    type: FieldType.number,
  },
];
