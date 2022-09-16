import { Button } from 'components/primitives/Button';
import { AddressInput } from 'components/primitives/Forms/AddressInput';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import { Input } from 'components/primitives/Forms/Input';
import { TokenAmountInput } from 'components/primitives/Forms/TokenAmountInput';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActionEditorProps } from '..';
import validateRawTransaction from './validateRawTransaction';

export interface RawTransactionValues {
  to: string;
  value: BigNumber;
  data: string;
}

const RawTransactionEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const parsedData = useMemo(() => {
    return {
      to: decodedCall?.to,
      value: decodedCall?.value,
      data: decodedCall?.optionalProps?.data,
    };
  }, [decodedCall]);

  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    resolver: validateRawTransaction,
    context: { t },
    defaultValues: {
      to: parsedData?.to,
      value: parsedData?.value,
      data: parsedData?.data,
    },
  });

  const submitAction = (values: RawTransactionValues) => {
    onSubmit({
      ...decodedCall,
      to: values.to,
      value: values.value,
      optionalProps: {
        data: values.data,
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Controller
          name="to"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            return (
              <Control>
                <ControlLabel>{t('toAddress')}</ControlLabel>
                <ControlRow>
                  <AddressInput
                    {...field}
                    isInvalid={!!error}
                    placeholder={t('ethereumAddress')}
                  />
                </ControlRow>
                {!!error && (
                  <ErrorLabel margin="0.5rem 0">{error.toString()}</ErrorLabel>
                )}
              </Control>
            );
          }}
        />

        <Controller
          name="value"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            return (
              <Control>
                <ControlLabel>{`${t('amount')} (${t('in')} wei)`}</ControlLabel>
                <ControlRow>
                  <TokenAmountInput
                    {...field}
                    decimals={0}
                    isInvalid={!!error}
                  />
                </ControlRow>

                {!!error && (
                  <ErrorLabel margin="0.5rem 0">{error.toString()}</ErrorLabel>
                )}
              </Control>
            );
          }}
        />

        <Controller
          name="data"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            return (
              <Control>
                <ControlLabel>{`${t('data')} (hex)`}</ControlLabel>
                <ControlRow>
                  <Input
                    {...field}
                    isInvalid={!!error}
                    placeholder={t('data')}
                  />
                </ControlRow>
                {!!error && (
                  <ErrorLabel margin="0.5rem 0">{error.toString()}</ErrorLabel>
                )}
              </Control>
            );
          }}
        />

        <Button
          m="1rem 0 0"
          fullWidth
          data-testid="submit-erc20transfer"
          type="submit"
        >
          {t('saveAction')}
        </Button>
      </form>
    </div>
  );
};

export default RawTransactionEditor;
