import { FC, useMemo, useState } from 'react';
import { ActionEditorProps } from '..';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { Input } from 'components/primitives/Forms/Input';
import { BigNumber } from 'ethers';
import { Button } from 'components/primitives/Button';
import { DurationInput } from 'components/primitives/Forms/DurationInput';
import { MdCached } from 'react-icons/md';
import validateSetGuildConfig from './validateSetGuildConfig';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { ErrorLabel as Error } from 'components/primitives/Forms/ErrorLabel';
import { Controller, useForm } from 'react-hook-form';
import { getUpdatedValues } from './useUpdatedGuildConfigValues';

export const bn = (n: string | number | BigNumber) => BigNumber.from(n);

export const pickValue = (
  current: BigNumber,
  modifyed: BigNumber
): BigNumber => {
  if (!!current && BigNumber.isBigNumber(current)) {
    if (
      !!modifyed &&
      BigNumber.isBigNumber(modifyed) &&
      !bn(modifyed).eq(current)
    ) {
      return bn(modifyed);
    }
    return bn(current);
  } else if (!!modifyed && BigNumber.isBigNumber(modifyed)) {
    return bn(modifyed);
  }
  return BigNumber.from(0);
};

export interface Data {
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
type ControlField =
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

export const fields = [
  { name: 'proposalTime', label: 'Proposal time', type: 'duration' },
  { name: 'timeForExecution', label: 'Time for execution', type: 'duration' },
  {
    name: 'votingPowerPercentageForProposalExecution',
    label: 'Voting power percentage for proposal execution',
    type: 'number',
  }, // porcentage
  {
    name: 'votingPowerPercentageForProposalCreation',
    label: 'Voting power percentage for proposal creation',
    type: 'number',
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

const SetGuildConfigEditor: FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { guildId } = useTypedParams();
  const { data: currentGuildConfig } = useGuildConfig(guildId);
  const { t } = useTranslation();
  const [noValueUpdatedError, setNoValueUpdatedError] = useState(false);

  const parsedData = useMemo<Data>(() => {
    if (!decodedCall) return null;
    const {
      _proposalTime: decodedCallProposalTime,
      _timeForExecution: decodedCallTimeForExecution,
      _votingPowerPercentageForProposalExecution:
        decodedCallVotingPowerPercentageForProposalExecution,
      _r: decodedCallVotingPowerPercentageForProposalCreation,
      _voteGas: decodedCallVoteGas,
      _maxGasPrice: decodedCallMaxGasPrice,
      _maxActiveProposals: decodedCallMaxActiveProposals,
      _lockTime: decodedCallLockTime,
      _minimumMembersForProposalCreation:
        decodedCallMinimumMembersForProposalCreation,
      _minimumTokensLockedForProposalCreation:
        decodedCallMinimumTokensLockedForProposalCreation,
    } = decodedCall.args;

    const {
      proposalTime: currentProposalTime,
      timeForExecution: currentTimeForExecution,
      votingPowerPercentageForProposalExecution:
        currentVotingPowerPercentageForProposalExecution,
      votingPowerPercentageForProposalCreation:
        currentvotingPowerPercentageForProposalCreation,
      voteGas: currentVoteGas,
      maxGasPrice: currentMaxGasPrice,
      maxActiveProposals: currentmaxActiveProposals,
      lockTime: currentlockTime,
      minimumMembersForProposalCreation:
        currentMinimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation:
        currentMinimumTokensLockedForProposalCreation,
    } = currentGuildConfig;

    return {
      proposalTime: pickValue(currentProposalTime, decodedCallProposalTime),
      timeForExecution: pickValue(
        currentTimeForExecution,
        decodedCallTimeForExecution
      ),
      votingPowerPercentageForProposalExecution: pickValue(
        currentVotingPowerPercentageForProposalExecution,
        decodedCallVotingPowerPercentageForProposalExecution
      ),
      votingPowerPercentageForProposalCreation: pickValue(
        currentvotingPowerPercentageForProposalCreation,
        decodedCallVotingPowerPercentageForProposalCreation
      ),
      voteGas: pickValue(currentVoteGas, decodedCallVoteGas),
      maxGasPrice: pickValue(currentMaxGasPrice, decodedCallMaxGasPrice),
      maxActiveProposals: pickValue(
        currentmaxActiveProposals,
        decodedCallMaxActiveProposals
      ),
      lockTime: pickValue(currentlockTime, decodedCallLockTime),
      minimumMembersForProposalCreation: pickValue(
        currentMinimumMembersForProposalCreation,
        decodedCallMinimumMembersForProposalCreation
      ),
      minimumTokensLockedForProposalCreation: pickValue(
        currentMinimumTokensLockedForProposalCreation,
        decodedCallMinimumTokensLockedForProposalCreation
      ),
    };
  }, [decodedCall, currentGuildConfig]);

  const { control, handleSubmit, setValue } = useForm({
    resolver: validateSetGuildConfig,
    // context: { t, activeTab },
    defaultValues: {
      proposalTime: parsedData.proposalTime,
      timeForExecution: parsedData.timeForExecution,
      votingPowerPercentageForProposalExecution:
        parsedData.votingPowerPercentageForProposalExecution,
      votingPowerPercentageForProposalCreation:
        parsedData.votingPowerPercentageForProposalCreation,
      voteGas: parsedData.voteGas,
      maxGasPrice: parsedData.maxGasPrice,
      maxActiveProposals: parsedData.maxActiveProposals,
      lockTime: parsedData.lockTime,
      minimumMembersForProposalCreation:
        parsedData.minimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation:
        parsedData.minimumTokensLockedForProposalCreation,
    },
  });

  const submitAction = (values: Data) => {
    const {
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
    } = values;
    const call = {
      ...decodedCall,
      args: {
        _proposalTime: bn(proposalTime),
        _timeForExecution: bn(timeForExecution),
        _votingPowerPercentageForProposalExecution: bn(
          votingPowerPercentageForProposalExecution
        ),
        _votingPowerPercentageForProposalCreation: bn(
          votingPowerPercentageForProposalCreation
        ),
        _voteGas: bn(voteGas),
        _maxGasPrice: bn(maxGasPrice),
        _maxActiveProposals: bn(maxActiveProposals),
        _lockTime: bn(lockTime),
        _minimumMembersForProposalCreation: bn(
          minimumMembersForProposalCreation
        ),
        _minimumTokensLockedForProposalCreation: bn(
          minimumTokensLockedForProposalCreation
        ),
      },
    };

    const updatedValues = getUpdatedValues(currentGuildConfig, values);

    if (Object.keys(updatedValues).length > 0) {
      return onSubmit(call);
    }
    return setNoValueUpdatedError(true);
  };

  const restoreInputValue = fieldName => {
    setValue(fieldName, currentGuildConfig[fieldName]);
  };

  return (
    <form onSubmit={handleSubmit(submitAction, console.error)}>
      {fields.map(f => {
        return (
          <div key={f.name}>
            <Controller
              name={f.name as ControlField}
              control={control}
              render={({ field: { ref, ...field }, fieldState }) => {
                const { invalid, error } = fieldState;
                const valueChanged = !bn(field.value).eq(
                  bn(currentGuildConfig[f.name])
                );
                return (
                  <>
                    <Control>
                      <ControlLabel>{f.label}</ControlLabel>
                      <ControlRow>
                        {f.type === 'duration' ? (
                          <DurationInput
                            {...field}
                            aria-label={field.name}
                            value={bn(field.value ?? 0).toNumber()}
                            onChange={v => field.onChange(bn(v).toNumber())}
                            isInvalid={invalid && !!error}
                            iconRight={
                              valueChanged ? (
                                <Button
                                  variant="minimal"
                                  onClick={() => restoreInputValue(field.name)}
                                >
                                  <MdCached size={20} />
                                </Button>
                              ) : null
                            }
                          />
                        ) : (
                          <Input
                            {...field}
                            value={bn(field.value).toString()}
                            aria-label={field.name}
                            isInvalid={invalid && !!error}
                            onChange={e =>
                              field.onChange(bn(e.target.value).toString())
                            }
                            iconRight={
                              valueChanged ? (
                                <Button
                                  variant="minimal"
                                  onClick={() => restoreInputValue(field.name)}
                                >
                                  <MdCached size={20} />
                                </Button>
                              ) : null
                            }
                          />
                        )}
                        {invalid && !!error && <Error>{error.message}</Error>}
                      </ControlRow>
                    </Control>
                  </>
                );
              }}
            />
          </div>
        );
      })}
      {noValueUpdatedError && (
        <Error>No value has been updated from default config</Error>
      )}
      <Button m="1rem 0 0" fullWidth type="submit">
        {t('saveAction')}
      </Button>
    </form>
  );
};

export default SetGuildConfigEditor;
