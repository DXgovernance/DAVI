import { FC, useMemo } from 'react';
import { ActionEditorProps } from '..';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { NumericalInput } from 'components/primitives/Forms/NumericalInput';
import { BigNumber } from 'ethers';
import { Button } from 'components/primitives/Button';
import { DurationInput } from 'components/primitives/Forms/DurationInput';

import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { ErrorLabel as Error } from 'components/primitives/Forms/ErrorLabel';
import { Controller, useForm } from 'react-hook-form';

const bn = (n: string | number | BigNumber) => BigNumber.from(n);

const pickValue = (current: BigNumber, modifyed: BigNumber): BigNumber => {
  if (!!current && BigNumber.isBigNumber(current)) {
    if (
      !!modifyed &&
      BigNumber.isBigNumber(modifyed) &&
      !bn(modifyed).eq(current)
    ) {
      return modifyed;
    }
    return current;
  } else if (!!modifyed && BigNumber.isBigNumber(modifyed)) {
    return modifyed;
  }
  return BigNumber.from(0);
};

const getUpdatedValues = (current, modifyed) => {
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

interface Data {
  proposalTime: BigNumber;
  timeForExecution: BigNumber;
  votingPowerForProposalExecution: BigNumber;
  votingPowerForProposalCreation: BigNumber;
  voteGas: BigNumber;
  maxGasPrice: BigNumber;
  maxActiveProposals: BigNumber;
  lockTime: BigNumber;
  minimumMembersForProposalCreation: BigNumber;
  minimumTokensLockedForProposalCreation: BigNumber;
}
type ControlField =
  | 'votingPowerForProposalExecution'
  | 'votingPowerForProposalCreation'
  | 'voteGas'
  | 'maxGasPrice'
  | 'maxActiveProposals'
  | 'minimumMembersForProposalCreation'
  | 'minimumTokensLockedForProposalCreation'
  | 'proposalTime'
  | 'timeForExecution'
  | 'lockTime';

const fields = [
  { name: 'votingPowerForProposalExecution', type: 'number' },
  { name: 'votingPowerForProposalCreation', type: 'number' },
  { name: 'voteGas', type: 'number' },
  { name: 'maxGasPrice', type: 'number' },
  { name: 'maxActiveProposals', type: 'number' },
  { name: 'minimumMembersForProposalCreation', type: 'number' },
  { name: 'minimumTokensLockedForProposalCreation', type: 'number' },
  { name: 'proposalTime', type: 'duration' },
  { name: 'timeForExecution', type: 'duration' },
  { name: 'lockTime', type: 'duration' },
];

const SetGuildConfigEditor: FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { guildId } = useTypedParams();
  const { data: currentGuildConfig } = useGuildConfig(guildId);
  const { t } = useTranslation();

  const parsedData = useMemo<Data>(() => {
    if (!decodedCall) return null;
    const {
      proposalTime: decodedCallProposalTime,
      timeForExecution: decodedCallTimeForExecution,
      votingPowerForProposalExecution:
        decodedCallVotingPowerForProposalExecution,
      votingPowerForProposalCreation: decodedCallVotingPowerForProposalCreation,
      voteGas: decodedCallVoteGas,
      maxGasPrice: decodedCallMaxGasPrice,
      maxActiveProposals: decodedCallMaxActiveProposals,
      lockTime: decodedCallLockTime,
      minimumMembersForProposalCreation:
        decodedCallMinimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation:
        decodedCallMinimumTokensLockedForProposalCreation,
    } = decodedCall.args;

    const {
      proposalTime: currentproposalTime,
      timeForExecution: currenttimeForExecution,
      votingPowerForProposalExecution: currentvotingPowerForProposalExecution,
      votingPowerForProposalCreation: currentvotingPowerForProposalCreation,
      voteGas: currentVoteGas,
      maxGasPrice: currentMaxGasPrice,
      maxActiveProposals: currentmaxActiveProposals,
      lockTime: currentlockTime,
      minimumMembersForProposalCreation:
        currentMinimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation:
        currentMinimumTokensLockedForProposalCreation,
    } = currentGuildConfig;

    // const { asset, functionName, tab } = decodedCall.optionalProps;
    return {
      proposalTime: pickValue(currentproposalTime, decodedCallProposalTime),
      timeForExecution: pickValue(
        currenttimeForExecution,
        decodedCallTimeForExecution
      ),
      votingPowerForProposalExecution: pickValue(
        currentvotingPowerForProposalExecution,
        decodedCallVotingPowerForProposalExecution
      ),
      votingPowerForProposalCreation: pickValue(
        currentvotingPowerForProposalCreation,
        decodedCallVotingPowerForProposalCreation
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

  const { control, handleSubmit } = useForm({
    // resolver: validateSetPermissions,
    // context: { t, activeTab },
    defaultValues: {
      proposalTime: parsedData.proposalTime,
      timeForExecution: parsedData.timeForExecution,
      votingPowerForProposalExecution:
        parsedData.votingPowerForProposalExecution,
      votingPowerForProposalCreation: parsedData.votingPowerForProposalCreation,
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
    // maxActiveProposals,
    const {
      proposalTime,
      timeForExecution,
      votingPowerForProposalExecution,
      votingPowerForProposalCreation,
      voteGas,
      maxGasPrice,
      lockTime,
      minimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation,
    } = values;
    const call = {
      ...decodedCall,
      args: {
        proposalTime,
        timeForExecution,
        votingPowerForProposalExecution,
        votingPowerForProposalCreation,
        voteGas,
        maxGasPrice,
        lockTime,
        minimumMembersForProposalCreation,
        minimumTokensLockedForProposalCreation,
      },
      optionalProps: {
        updatedFields: getUpdatedValues(currentGuildConfig, values),
      },
    };
    console.log('updatedfields', getUpdatedValues(currentGuildConfig, values));
    onSubmit(call);
  };

  return (
    <form onSubmit={handleSubmit(submitAction, console.error)}>
      {fields.map(f => {
        return (
          <div>
            <Controller
              name={f.name as ControlField}
              control={control}
              render={({ field: { ref, ...field }, fieldState }) => {
                const { invalid, error } = fieldState;
                const onChange = (value: string | number) => {
                  field.onChange(BigNumber.from(value ?? 0));
                };
                return (
                  <>
                    <Control>
                      <ControlLabel>
                        {/* {t('proposalTime', { defaultValue: field.name })}
                         */}
                        {field.name}
                      </ControlLabel>
                      <ControlRow>
                        {f.type === 'duration' ? (
                          <DurationInput
                            {...field}
                            aria-label={field.name}
                            value={BigNumber.from(field.value ?? 0).toNumber()}
                            onChange={onChange}
                          />
                        ) : (
                          <NumericalInput
                            {...field}
                            value={BigNumber.from(field.value ?? 0).toString()}
                            aria-label={field.name}
                            isInvalid={invalid && !!error}
                            onChange={onChange}
                          />
                        )}
                      </ControlRow>
                    </Control>
                    {invalid && !!error && <Error>{error.message}</Error>}
                  </>
                );
              }}
            />
          </div>
        );
      })}

      <Button m="1rem 0 0" fullWidth type="submit">
        {t('saveAction')}
      </Button>
    </form>
  );
};

export default SetGuildConfigEditor;

