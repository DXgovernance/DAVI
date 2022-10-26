export const FIELDS = [
  { name: 'proposalTime', label: 'Proposal time', type: 'duration' },
  { name: 'timeForExecution', label: 'Time for execution', type: 'duration' },
  {
    name: 'votingPowerPercentageForProposalExecution',
    label: 'Voting power percentage for proposal execution',
    type: 'percentage',
  },
  {
    name: 'votingPowerPercentageForProposalCreation',
    label: 'Voting power percentage for proposal creation',
    type: 'percentage',
  },
  { name: 'voteGas', label: 'Vote gas', type: 'number' },
  { name: 'maxGasPrice', label: 'Max gas price', type: 'number' },
  { name: 'maxActiveProposals', label: 'Max active proposals', type: 'number' },
  { name: 'lockTime', label: 'Lock time', type: 'duration' },
  {
    name: 'minimumMembersForProposalCreation',
    label: 'Minimum members for proposal creation',
    type: 'number',
  },
  {
    name: 'minimumTokensLockedForProposalCreation',
    label: 'Minimum tokens locked for proposal creation',
    type: 'number',
  },
];
