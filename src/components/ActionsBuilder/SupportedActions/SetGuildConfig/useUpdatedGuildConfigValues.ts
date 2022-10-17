import { useMemo } from 'react';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { getUpdatedValues } from './utils';
import { BigNumber } from 'ethers';

interface ArgConfigValues {
  _proposalTime?: BigNumber;
  _timeForExecution?: BigNumber;
  _votingPowerPercentageForProposalExecution?: BigNumber;
  _votingPowerPercentageForProposalCreation?: BigNumber;
  _voteGas?: BigNumber;
  _maxGasPrice?: BigNumber;
  _maxActiveProposals?: BigNumber;
  _lockTime?: BigNumber;
  _minimumMembersForProposalCreation?: BigNumber;
  _minimumTokensLockedForProposalCreation?: BigNumber;
}

export const useUpdatedGuildConfigValues = (newValues: ArgConfigValues) => {
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
