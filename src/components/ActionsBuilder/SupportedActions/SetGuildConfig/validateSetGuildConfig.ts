import { Data, bn } from './SetGuildConfigEditor';
interface SetGuildConfigValues extends Data {}

const validateSetGuildConfig = (
  values: SetGuildConfigValues
  // { t }: Context
) => {
  const {
    proposalTime,
    // timeForExecution,
    votingPowerPercentageForProposalExecution,
    // votingPowerPercentageForProposalCreation,
    voteGas,
    // maxGasPrice,
    // maxActiveProposals,
    lockTime,
    // minimumMembersForProposalCreation,
    // minimumTokensLockedForProposalCreation,
  } = values;

  let errors = {
    proposalTime: null,
    timeForExecution: null,
    votingPowerPercentageForProposalExecution: null,
    votingPowerPercentageForProposalCreation: null,
    voteGas: null,
    maxGasPrice: null,
    maxActiveProposals: null,
    lockTime: null,
    minimumMembersForProposalCreation: null,
    minimumTokensLockedForProposalCreation: null,
  };
  if (bn(proposalTime).toNumber() <= 0) {
    errors.proposalTime = 'proposal time has to be more than 0';
  }
  if (bn(lockTime).lt(bn(proposalTime))) {
    errors.lockTime =
      'ERC20Guild: lockTime has to be higher or equal to proposalTime';
  }

  if (bn(votingPowerPercentageForProposalExecution).lte(bn(0))) {
    errors.votingPowerPercentageForProposalExecution =
      'ERC20Guild: voting power for execution has to be more than 0';
  }

  if (bn(voteGas).gte(117001)) {
    errors.voteGas =
      'ERC20Guild: vote gas has to be equal or lower than 117000';
  }

  return {
    errors: Object.entries(errors).reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...(!!value && { [key]: value }), // remove keys that has no error value
      };
    }, {}),
    values,
  };
};

export default validateSetGuildConfig;
