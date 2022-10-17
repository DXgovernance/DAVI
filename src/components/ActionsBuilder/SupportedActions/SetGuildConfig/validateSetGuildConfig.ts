import { TFunction } from 'react-i18next';
import { SetGuildConfigFields } from './types';
import { bn } from './utils';
import { removeNullValues } from 'utils/object';

interface Context {
  t: TFunction;
}

interface SetGuildConfigValues extends SetGuildConfigFields {}

const validateSetGuildConfig = (
  values: SetGuildConfigValues,
  { t }: Context
) => {
  const {
    proposalTime,
    votingPowerPercentageForProposalExecution,
    voteGas,
    lockTime,
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
    errors.proposalTime = t('proposalTimeHasToBeMoreThanZero');
  }

  if (bn(lockTime).lt(bn(proposalTime))) {
    errors.lockTime = t('lockTimeHasToBeHigherOrEqualToProposalTime');
  }

  if (bn(votingPowerPercentageForProposalExecution).lte(bn(0))) {
    errors.votingPowerPercentageForProposalExecution = t(
      'votingPowerPercentageForProposalExecutionHasToBeMoreThanZero'
    );
  }

  if (bn(voteGas).gte(117001)) {
    errors.voteGas = t('voteGasHasToBeEqualOrLowerThan117000');
  }

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateSetGuildConfig;
