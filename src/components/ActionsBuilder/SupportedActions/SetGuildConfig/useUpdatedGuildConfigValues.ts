import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { fields } from './SetGuildConfigEditor';

const bn = (n: string | number | BigNumber) => BigNumber.from(n);

export const getUpdatedValues = (current, modifyed): {} => {
  if (!current || !modifyed) return {};
  return Object.keys(current).reduce((acc, key) => {
    if (!fields.map(f => f.name).includes(key)) return acc;
    const currValue = bn(current[key] || 0);
    const newValue = bn(modifyed[key] || 0);

    if (!currValue.eq(newValue)) {
      return {
        ...acc,
        [key]: newValue,
      };
    }
    return acc;
  }, {});
};

export const useUpdatedGuildConfigValues = newValues => {
  const { guildId } = useTypedParams();
  const { data: currentGuildConfig } = useGuildConfig(guildId);
  const parsedData = useMemo(() => {
    if (!newValues) return null;
    const {
      _proposalTime: proposalTime,
      _timeForExecution: timeForExecution,
      _votingPowerPercentageForProposalExecution:
        votingPowerPercentageForProposalExecution,
      _votingPowerPercentageForProposalCreation:
        votingPowerPercentageForProposalCreation,
      _voteGas: voteGas,
      _maxGasPrice: maxGasPrice,
      _maxActiveProposals: maxActiveProposals,
      _lockTime: lockTime,
      _minimumMembersForProposalCreation: minimumMembersForProposalCreation,
      _minimumTokensLockedForProposalCreation:
        minimumTokensLockedForProposalCreation,
    } = newValues;

    return getUpdatedValues(currentGuildConfig, {
      proposalTime,
      timeForExecution,
      votingPowerPercentageForProposalExecution,
      votingPowerPercentageForProposalCreation,
      voteGas,
      maxGasPrice,
      maxActiveProposals,
      lockTime,
      minimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation,
    });
  }, [newValues, currentGuildConfig]);

  return parsedData;
};
