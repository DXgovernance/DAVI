import { FC, useMemo, useState } from 'react';
import { ActionEditorProps } from '..';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { NumericalInput as Input } from 'components/primitives/Forms/NumericalInput';
import { Button } from 'components/primitives/Button';
import { DurationInput } from 'components/primitives/Forms/DurationInput';
import { MdCached } from 'react-icons/md';
import validateSetGuildConfig from './validateSetGuildConfig';
// import { Flex } from 'components/primitives/Layout/Flex';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { ErrorLabel as Error } from 'components/primitives/Forms/ErrorLabel';
import { Controller, useForm } from 'react-hook-form';
import {
  bn,
  pickUpdatedOrDefaultValue as pickValue,
  getUpdatedValues,
} from './utils';
import { FIELDS } from './constants';
import { SetGuildConfigFields, ControlField, FieldType } from './types';

const getComponent = type => {
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

  const parsedData = useMemo<SetGuildConfigFields>(() => {
    if (!decodedCall) return null;
    const {
      _proposalTime: decodedCallProposalTime,
      _timeForExecution: decodedCallTimeForExecution,
      _votingPowerPercentageForProposalExecution:
        decodedCallVotingPowerPercentageForProposalExecution,
      _votingPowerPercentageForProposalCreation:
        decodedCallVotingPowerPercentageForProposalCreation,
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: validateSetGuildConfig,
    context: { t },
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

  const restoreInputValue = (fieldName: ControlField) => {
    setValue(fieldName, currentGuildConfig[fieldName]);
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
                const valueChanged = !bn(field.value).eq(
                  bn(currentGuildConfig[f.name])
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
                        aria-label={field.name}
                        value={value as never}
                        onChange={handleChange}
                        isInvalid={!!error}
                        icon={f.type === FieldType.percentage && <>%</>}
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
                              <MdCached size={16} />
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
