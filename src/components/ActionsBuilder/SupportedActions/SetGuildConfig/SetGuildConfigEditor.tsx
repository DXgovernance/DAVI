import { FC, useMemo, useState } from 'react';
import { MdCached } from 'react-icons/md';
import { Controller, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { ActionEditorProps } from '..';
import { NumericalInput as Input } from 'components/primitives/Forms/NumericalInput';
import { Button } from 'components/primitives/Button';
import { DurationInput } from 'components/primitives/Forms/DurationInput';
import { ErrorLabel as Error } from 'components/primitives/Forms/ErrorLabel';
import validateSetGuildConfig from './validateSetGuildConfig';
import {
  pickUpdatedOrDefaultValue as pickValue,
  getUpdatedValues,
} from './utils';
import { bn } from 'utils/safeBn';
import { FIELDS } from './constants';
import { SetGuildConfigFields, ControlField, FieldType } from './types';

const getComponent = (type: FieldType) => {
  if (type === FieldType.duration) return DurationInput;
  return Input;
};

const SetGuildConfigEditor: FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { guildId } = useTypedParams();
  const { data: currentGuildConfig } = useGuildConfig(guildId);
  const { t } = useTranslation();
  const [noValueUpdatedError, setNoValueUpdatedError] = useState(false);
  const theme = useTheme();

  const parsedData = useMemo<SetGuildConfigFields>(() => {
    if (!decodedCall) return null;
    const {
      _proposalTime: decodedCallProposalTime,
      _timeForExecution: decodedCallTimeForExecution,
      _voteGas: decodedCallVoteGas,
      _maxGasPrice: decodedCallMaxGasPrice,
      _maxActiveProposals: decodedCallMaxActiveProposals,
      _lockTime: decodedCallLockTime,
      _minimumMembersForProposalCreation:
        decodedCallMinimumMembersForProposalCreation,
      _minimumTokensLockedForProposalCreation:
        decodedCallMinimumTokensLockedForProposalCreation,
    } = decodedCall.args;

    const decodedCallVotingPowerPercentageForProposalExecution = bn(
      decodedCall.args._votingPowerPercentageForProposalExecution
    ).div(100);

    const decodedCallVotingPowerPercentageForProposalCreation = bn(
      decodedCall.args._votingPowerPercentageForProposalCreation
    ).div(100);

    const {
      proposalTime: currentProposalTime,
      timeForExecution: currentTimeForExecution,
      voteGas: currentVoteGas,
      maxGasPrice: currentMaxGasPrice,
      maxActiveProposals: currentmaxActiveProposals,
      lockTime: currentlockTime,
      minimumMembersForProposalCreation:
        currentMinimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation:
        currentMinimumTokensLockedForProposalCreation,
    } = currentGuildConfig;

    const currentVotingPowerPercentageForProposalExecution = bn(
      currentGuildConfig.votingPowerPercentageForProposalExecution
    ).div(100);

    const currentvotingPowerPercentageForProposalCreation = bn(
      currentGuildConfig.votingPowerPercentageForProposalCreation
    ).div(100);

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: validateSetGuildConfig,
    context: { t, currentGuildConfig },
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

  const submitAction = (values: SetGuildConfigFields) => {
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
        ).mul(100),
        _votingPowerPercentageForProposalCreation: bn(
          votingPowerPercentageForProposalCreation
        ).mul(100),
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

    const updatedValues = getUpdatedValues(currentGuildConfig, {
      proposalTime,
      timeForExecution,
      votingPowerPercentageForProposalExecution: bn(
        votingPowerPercentageForProposalExecution
      ).mul(100),
      votingPowerPercentageForProposalCreation: bn(
        votingPowerPercentageForProposalCreation
      ).mul(100),
      voteGas,
      maxGasPrice,
      maxActiveProposals,
      lockTime,
      minimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation,
    });

    if (Object.keys(updatedValues).length > 0) {
      return onSubmit(call);
    }
    return setNoValueUpdatedError(true);
  };

  const getCurrentConfigValue = (fieldName: ControlField) => {
    switch (fieldName) {
      case 'votingPowerPercentageForProposalExecution':
      case 'votingPowerPercentageForProposalCreation':
        return bn(currentGuildConfig[fieldName]).div(100);
      default:
        return currentGuildConfig[fieldName];
    }
  };

  const fieldValueHasChanged = (fieldName: ControlField, value) => {
    return !bn(value).eq(bn(getCurrentConfigValue(fieldName)));
  };

  const restoreInputValue = (fieldName: ControlField) => {
    setValue(fieldName, getCurrentConfigValue(fieldName));
  };

  return (
    <form onSubmit={handleSubmit(submitAction, console.error)}>
      {FIELDS.map(f => {
        const Component = getComponent(f.type);
        return (
          <div key={f.name}>
            <Controller
              name={f.name as ControlField}
              control={control}
              render={({ field: { ref, ...field } }) => {
                const error = errors[f.name];
                const valueChanged = fieldValueHasChanged(
                  f.name as ControlField,
                  field.value
                );
                const handleChange = (v: string | number) => {
                  if (f.type === FieldType.duration) {
                    field.onChange(bn(v || '0').toNumber());
                  } else {
                    field.onChange(v || '0');
                  }
                  trigger();
                };
                const value =
                  f.type === FieldType.duration
                    ? bn(field.value ?? 0).toNumber()
                    : bn(field.value ?? 0).toString();

                return (
                  <Control>
                    <ControlLabel>{f.label}</ControlLabel>
                    <ControlRow>
                      <Component
                        {...field}
                        aria-label={f.label}
                        name={f.name}
                        value={value as never}
                        onChange={handleChange}
                        isInvalid={!!error}
                        icon={f.type === FieldType.percentage && <>%</>}
                        displayClearIcon={false}
                        iconRight={
                          valueChanged && (
                            <Button
                              variant="minimal"
                              onClick={e => {
                                e.stopPropagation();
                                restoreInputValue(field.name);
                                trigger();
                              }}
                            >
                              <MdCached size={16} color={theme.colors.white} />
                            </Button>
                          )
                        }
                      />
                    </ControlRow>
                    {!!error && <Error>{error}</Error>}
                  </Control>
                );
              }}
            />
          </div>
        );
      })}
      {noValueUpdatedError && (
        <Error>{t('noValueHasBeenUpdatedFromCurrentGuildConfig')}</Error>
      )}
      <Button m="1rem 0 0" fullWidth type="submit">
        {t('saveAction')}
      </Button>
    </form>
  );
};

export default SetGuildConfigEditor;
