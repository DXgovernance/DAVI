import { TFunction } from 'react-i18next';
import { SetGuildConfigFields } from './types';
import { bn } from 'utils/safeBn';
import { removeNullValues } from 'utils/object';
import { GuildConfigProps } from 'Modules/Guilds/Hooks/useGuildConfig';

interface Context {
  t: TFunction;
  currentGuildConfig: GuildConfigProps;
}

interface SetGuildConfigValues extends SetGuildConfigFields {}

const validateSetGuildConfig = (
  values: SetGuildConfigValues,
  { t, currentGuildConfig }: Context
) => {
  const {
    proposalTime,
    votingPowerPercentageForProposalExecution,
    votingPowerPercentageForProposalCreation,
    voteGas,
    lockTime,
  } = values;

  const errors = {
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
    if (!bn(lockTime).eq(currentGuildConfig.lockTime)) {
      errors.lockTime = t('lockTimeHasToBeHigherOrEqualToProposalTime');
    }
    if (!bn(proposalTime).eq(currentGuildConfig.proposalTime)) {
      errors.proposalTime = t('proposalTimeHasToBeLowerOrEqualToLockTime');
    }
  }

  if (bn(votingPowerPercentageForProposalExecution).lte(bn(0))) {
    errors.votingPowerPercentageForProposalExecution = t(
      'votingPowerPercentageForProposalExecutionHasToBeMoreThanZero'
    );
  }

  if (bn(voteGas).gte(117001)) {
    errors.voteGas = t('voteGasHasToBeEqualOrLowerThan117000');
  }

  if (bn(votingPowerPercentageForProposalExecution).gt(100)) {
    errors.votingPowerPercentageForProposalExecution = t(
      'cantBeGreaterThan100'
    );
  }
  if (bn(votingPowerPercentageForProposalCreation).gt(100)) {
    errors.votingPowerPercentageForProposalCreation = t('cantBeGreaterThan100');
  }

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateSetGuildConfig;
