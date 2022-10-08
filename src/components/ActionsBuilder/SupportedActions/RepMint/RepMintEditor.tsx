import { Input } from 'components/primitives/Forms/Input';
import { Button } from 'components/primitives/Button';
import { Controller, useForm } from 'react-hook-form';
import { Avatar } from 'components/Avatar';
import React, { useEffect, useState } from 'react';
import { ActionEditorProps } from '..';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { MAINNET_ID } from 'utils';
import { ReactComponent as Info } from 'assets/images/info.svg';
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

interface RepMintFormValues {
  repPercent: string;
}
export const Mint: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [repAmount, setRepAmount] = useState<string>('0');
  const { data } = useTotalSupply({ decodedCall });
  const { tokenData } = useTokenData();
  const [recipient, setRecipient] = useState<string>(data?.toAddress);
  const { imageUrl } = useENSAvatar(data?.toAddress, MAINNET_ID);

  const { control, handleSubmit, setValue } = useForm<RepMintFormValues>({
    resolver: validateRepMint,
    context: { t },
  });

  useEffect(() => {
    if (data?.amount) {
      const initialRepAmount = ethers.utils.formatEther(data?.amount);
      setRepAmount(initialRepAmount);
      setValue(
        'repPercent',
        String(
          (Number(initialRepAmount) * 100) /
            tokenData?.totalSupply?.toNumber() || 0
        )
      );
    }
  }, [data?.amount]); //eslint-disable-line

  const updateRepAmount = (value: string) => {
    if (!value) {
      setRepAmount('0');
    } else {
      const amount = String(
        (Number(value) / 100) * tokenData?.totalSupply?.toNumber()
      );
      setRepAmount(amount);
    }
  };

  const submitAction = () => {
    onSubmit({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        to: recipient,
        amount: ethers.utils.parseUnits(repAmount.toString()),
      },
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Control>
          <ControlLabel>
            {t('repMint.recipient')}
            <Tooltip text={t('repMint.recipientTooltip')} placement="bottom">
              <StyledIcon src={Info} />
            </Tooltip>
          </ControlLabel>
          <ControlRow>
            <Input
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              icon={
                <Avatar
                  src={imageUrl}
                  defaultSeed={data?.toAddress}
                  size={18}
                />
              }
            />
          </ControlRow>
        </Control>
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
