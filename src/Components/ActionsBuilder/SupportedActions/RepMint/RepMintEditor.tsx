import styled from 'styled-components';
import Input from 'old-components/Guilds/common/Form/Input';
import { BlockButton } from 'Components/ActionsModal/ActionsModal.styled';
import { Controller, useForm } from 'react-hook-form';
import Avatar from 'old-components/Guilds/Avatar';
import React, { useState } from 'react';
import { ActionEditorProps } from '..';
import { ethers, BigNumber } from 'ethers';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { Box } from 'Components/Primitives/Layout';
import { shortenAddress, MAINNET_ID } from 'utils';
import { ReactComponent as Info } from 'assets/images/info.svg';
import StyledIcon from 'old-components/Guilds/common/SVG';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import NumericalInput from 'old-components/Guilds/common/Form/NumericalInput';
import { useTotalSupply } from 'hooks/Guilds/guild/useTotalSupply';
import { useTokenData } from 'hooks/Guilds/guild/useTokenData';
import { StyledToolTip } from 'old-components/Guilds/common/ToolTip';
import { useTranslation } from 'react-i18next';
// import { BigNumber } from 'ethers';
import validateRepMint from './validateRepMint';

const Error = styled(Box)`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.label};
  margin-top: 0.5rem;
`;

const Control = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0;
  width: 100%;
`;

const ControlLabel = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.proposalText.grey};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ControlRow = styled(Box)`
  display: flex;
  align-items: stretch;
  height: 100%;
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

export const Mint: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    resolver: validateRepMint,
    context: { t },
  });

  // parse transfer state from calls
  // const [repPercent, setRepPercent] = useState<string>('0');
  const [repAmount, setRepAmount] = useState<BigNumber>(BigNumber.from(0));
  const { parsedData } = useTotalSupply({ decodedCall });
  const { tokenData } = useTokenData();

  const totalSupply = useBigNumberToNumber(tokenData?.totalSupply, 18);

  const { imageUrl } = useENSAvatar(parsedData?.toAddress, MAINNET_ID);

  const updateRepAmount = (value: string) => {
    if (!value) {
      setRepAmount(BigNumber.from(0));
      console.log('no value');
    } else {
      const amount = ethers.utils.parseUnits(
        String((Number(value) / 100) * totalSupply)
      );
      console.log('amount', amount);
      setRepAmount(amount);
    }
  };

  const submitAction = (values: any) => {
    console.log('submitAction', {
      ...values,
      repAmount: repAmount.toString(),
      totalSupply,
    });

    // onSubmit({
    //   ...decodedCall,
    //   args: {
    //     ...decodedCall.args,
    //     amount: repAmount,
    //   },
    // });
  };

  // const handleRepChange = (e: string) => {
  //   if (e) {
  //     setRepPercent(e);
  //   }
  // };

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
                      type="number"
                      {...field}
                      // value={repPercent}
                      // onChange={handleRepChange}
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
              <RepMintInput value={repAmount?.toString()} readOnly />
            </ControlRow>
          </Control>
        </ControlRow>
        <BlockButton type="submit">{t('saveAction')}</BlockButton>
      </form>
    </React.Fragment>
  );
};

export default Mint;
