import { Button } from 'components/primitives/Button';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useMemo, useState } from 'react';
import { ActionEditorProps } from '..';
import { ReactComponent as Info } from 'assets/images/info.svg';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useTotalSupply } from 'Modules/Guilds/Hooks/useTotalSupply';
import { useTokenData } from 'Modules/Guilds/Hooks/useTokenData';
import { Tooltip } from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import validateRepMint from './validateRepMint';
import {
  Control,
  ControlRow,
  ControlLabel,
} from 'components/primitives/Forms/Control';
import { Error, RepMintInput } from './styles';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { AddressInput } from 'components/primitives/Forms/AddressInput';

interface RepMintFormValues {
  repPercent: string;
  recipient: string;
}
export const Mint: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [repAmount, setRepAmount] = useState<string>('0');
  const { data } = useTotalSupply({ decodedCall });
  const { tokenData } = useTokenData();
  const totalSupply = useBigNumberToNumber(tokenData?.totalSupply, 18);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    return {
      recipient: decodedCall.args.to,
    };
  }, [decodedCall]);

  const { control, handleSubmit, setValue } = useForm<RepMintFormValues>({
    resolver: validateRepMint,
    context: { t },
    defaultValues: parsedData,
  });

  useEffect(() => {
    if (data?.amount) {
      const initialRepAmount = ethers.utils.formatEther(data?.amount);
      setRepAmount(initialRepAmount);
      setValue(
        'repPercent',
        String((Number(initialRepAmount) * 100) / totalSupply || 0)
      );
    }
  }, [data?.amount]); //eslint-disable-line

  const updateRepAmount = (value: string) => {
    if (!value) {
      setRepAmount('0');
    } else {
      const amount = String((Number(value) / 100) * totalSupply);
      setRepAmount(amount);
    }
  };

  const submitAction = (values: RepMintFormValues) => {
    onSubmit({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        to: values.recipient,
        amount: ethers.utils.parseUnits(repAmount.toString()),
      },
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Controller
          name="recipient"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { error } = fieldState;

            console.log('here');
            console.log(error);

            return (
              <Control>
                <ControlLabel>
                  {t('repMint.recipient')}
                  <Tooltip
                    text={t('repMint.recipientTooltip')}
                    placement="bottom"
                  >
                    <StyledIcon src={Info} />
                  </Tooltip>
                </ControlLabel>
                <ControlRow>
                  <AddressInput
                    {...field}
                    isInvalid={!!error}
                    name="recipient-address"
                    aria-label="recipient address input"
                    placeholder={t('ethereumAddress')}
                  />
                </ControlRow>
                {!!error && <Error>{error.message}</Error>}
              </Control>
            );
          }}
        />

        <ControlRow>
          <Controller
            name="repPercent"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { invalid, error } = fieldState;

              return (
                <Control>
                  <ControlLabel>
                    {t('repMint.repPercent')}
                    <Tooltip text={t('repMint.repPercentTooltip')}>
                      <StyledIcon src={Info} />
                    </Tooltip>
                  </ControlLabel>
                  <ControlRow>
                    <RepMintInput
                      {...field}
                      onChange={value => {
                        field.onChange(value);
                        updateRepAmount(value);
                      }}
                      isInvalid={!!error}
                    />
                  </ControlRow>
                  {invalid && !!error && <Error>{error.message}</Error>}
                </Control>
              );
            }}
          />
        </ControlRow>
        <ControlRow>
          <Control>
            <ControlLabel>
              {t('repMint.repAmount')}
              <Tooltip text={t('repMint.repAmountTooltip')}>
                <StyledIcon src={Info} />
              </Tooltip>
            </ControlLabel>
            <ControlRow>
              <RepMintInput disabled value={repAmount?.toString()} readOnly />
            </ControlRow>
          </Control>
        </ControlRow>
        <Button m="1rem 0 0" fullWidth type="submit">
          {t('saveAction')}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Mint;
