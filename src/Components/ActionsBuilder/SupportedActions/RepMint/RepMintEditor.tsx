import styled from 'styled-components';
import Input from 'old-components/Guilds/common/Form/Input';
import { Button } from 'old-components/Guilds/common/Button';
import { Controller, useForm } from 'react-hook-form';
import Avatar from 'old-components/Guilds/Avatar';
import React, { useEffect, useState } from 'react';
import { ActionEditorProps } from '..';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { shortenAddress, MAINNET_ID } from 'utils';
import { ReactComponent as Info } from 'assets/images/info.svg';
import StyledIcon from 'old-components/Guilds/common/SVG';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import NumericalInput from 'old-components/Guilds/common/Form/NumericalInput';
import { useTotalSupply } from 'hooks/Guilds/guild/useTotalSupply';
import { useTokenData } from 'hooks/Guilds/guild/useTokenData';
import { StyledToolTip } from 'old-components/Guilds/common/ToolTip';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import validateRepMint from './validateRepMint';
import {
  Control,
  ControlRow,
  ControlLabel,
} from 'Components/Primitives/Forms/Control';
import { ErrorLabel } from 'Components/Primitives/Forms/ErrorLabel';

const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;

const RepMintInput = styled(NumericalInput)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInfoIcon = styled(StyledIcon)`
  &:hover + ${StyledToolTip} {
    visibility: visible;
  }
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;
interface RepMintFormValues {
  repPercent: string;
}
export const Mint: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [repAmount, setRepAmount] = useState<string>('0');
  const { parsedData } = useTotalSupply({ decodedCall });
  const { tokenData } = useTokenData();
  const totalSupply = useBigNumberToNumber(tokenData?.totalSupply, 18);
  const { imageUrl } = useENSAvatar(parsedData?.toAddress, MAINNET_ID);

  const { control, handleSubmit, setValue } = useForm<RepMintFormValues>({
    resolver: validateRepMint,
    context: { t },
  });

  useEffect(() => {
    const initialRepAmount = ethers.utils.formatEther(
      parsedData?.amount?.toString()
    );
    if (initialRepAmount) {
      setRepAmount(initialRepAmount);
      setValue(
        'repPercent',
        String((Number(initialRepAmount) * 100) / totalSupply || 0)
      );
    }
  }, []); //eslint-disable-line

  const updateRepAmount = (value: string) => {
    if (!value) {
      setRepAmount('0');
    } else {
      const amount = String((Number(value) / 100) * totalSupply);
      setRepAmount(amount);
    }
  };

  const submitAction = () => {
    onSubmit({
      ...decodedCall,
      args: {
        ...decodedCall.args,
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
            <StyledInfoIcon src={Info} />
            <StyledToolTip>{t('repMint.recipientTooltip')}</StyledToolTip>
          </ControlLabel>
          <ControlRow>
            <Input
              value={shortenAddress(parsedData?.toAddress)}
              icon={
                <Avatar
                  src={imageUrl}
                  defaultSeed={parsedData?.toAddress}
                  size={18}
                />
              }
              readOnly
              disabled
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
                    <StyledInfoIcon src={Info} />
                    <StyledToolTip>
                      {t('repMint.repPercentTooltip')}
                    </StyledToolTip>
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
                  {invalid && !!error && <Error>{error}</Error>}
                </Control>
              );
            }}
          />
        </ControlRow>
        <ControlRow>
          <Control>
            <ControlLabel>
              {t('repMint.repAmount')}
              <StyledInfoIcon src={Info} />
              <StyledToolTip>{t('repMint.repAmountTooltip')}</StyledToolTip>
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
