import { ActionEditorProps } from '..';
import { BigNumber } from 'ethers';
import { Controller, useForm } from 'react-hook-form';
import { BlockButton } from 'Components/ActionsModal/ActionsModal.styled';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import Avatar from 'old-components/Guilds/Avatar';
import { TokenPicker } from 'Components/TokenPicker';
import Input from 'old-components/Guilds/common/Form/Input';
import TokenAmountInput from 'old-components/Guilds/common/Form/TokenAmountInput';
import { Box } from 'Components/Primitives/Layout';
import { useMemo, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { MAINNET_ID } from 'utils';
import { resolveUri } from 'utils/url';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'Components/Primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import validateERC20Transfer from './validateERC20Transfer';

const Error = styled(Box)`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.label};
  margin-top: 0.5rem;
`;

const Spacer = styled(Box)`
  margin-right: 1rem;
`;

const ClickableIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
interface TransferValues {
  tokenAddress: string;
  amount: BigNumber;
  recipientAddress: string;
}

const ERC20TransferEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, getValues } = useForm({
    resolver: validateERC20Transfer,
    context: { t },
  });

  const { tokenAddress, recipientAddress } = getValues();

  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);

  const { chain } = useNetwork();

  const source = useMemo<string>(() => {
    if (!decodedCall) return null;
    return decodedCall.from;
  }, [decodedCall]);

  // Get token details from the token address
  const { tokens } = useTokenList(chain?.id);
  const token = useMemo(() => {
    if (!tokenAddress || !tokens) return null;

    return tokens.find(({ address }) => address === tokenAddress);
  }, [tokens, tokenAddress]);

  const { data: tokenInfo } = useERC20Info(tokenAddress);
  const { imageUrl: destinationAvatarUrl } = useENSAvatar(
    recipientAddress,
    MAINNET_ID
  );

  const submitAction = (values: TransferValues) => {
    onSubmit({
      ...decodedCall,
      to: values.tokenAddress,
      args: {
        ...decodedCall.args,
        _value: values.amount,
        _to: values.recipientAddress,
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Controller
          name="recipientAddress"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { isTouched, invalid, error } = fieldState;

            return (
              <Control>
                <ControlLabel>{t('recipient')}</ControlLabel>
                <ControlRow>
                  <Input
                    {...field}
                    placeholder={t('ethereumAddress')}
                    isInvalid={isTouched && invalid && !!error}
                    onChange={e => field.onChange(e.target.value)}
                    icon={
                      <div>
                        {isTouched && !invalid && !error && (
                          <Avatar
                            src={destinationAvatarUrl}
                            defaultSeed={field.value}
                            size={24}
                          />
                        )}
                      </div>
                    }
                    iconRight={
                      field.value ? (
                        <ClickableIcon onClick={() => field.onChange('')}>
                          <FiX size={18} />
                        </ClickableIcon>
                      ) : null
                    }
                  />
                </ControlRow>
                {isTouched && invalid && !!error && <Error>{error}</Error>}
              </Control>
            );
          }}
        />

        <ControlRow>
          <Controller
            name="amount"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { isTouched, invalid, error } = fieldState;

              return (
                <Control>
                  <ControlLabel>{t('amount')}</ControlLabel>
                  <ControlRow>
                    <TokenAmountInput
                      {...field}
                      decimals={tokenInfo?.decimals}
                      isInvalid={isTouched && invalid && !!error}
                    />
                  </ControlRow>

                  {isTouched && invalid && !!error && <Error>{error}</Error>}
                </Control>
              );
            }}
          />

          <Spacer />

          <Controller
            name="tokenAddress"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { invalid, error } = fieldState;
              return (
                <>
                  <Control>
                    <ControlLabel>{t('asset')}</ControlLabel>
                    <ControlRow onClick={() => setIsTokenPickerOpen(true)}>
                      <Input
                        {...field}
                        value={tokenInfo?.symbol}
                        placeholder={t('token')}
                        isInvalid={invalid && !!error}
                        icon={
                          <div>
                            {field.value && (
                              <Avatar
                                src={resolveUri(token?.logoURI)}
                                defaultSeed={field.value}
                                size={18}
                              />
                            )}
                          </div>
                        }
                        iconRight={<FiChevronDown size={24} />}
                        readOnly
                      />
                    </ControlRow>
                    {invalid && !!error && <Error>{error}</Error>}
                  </Control>

                  <TokenPicker
                    {...field}
                    walletAddress={source || ''}
                    isOpen={isTokenPickerOpen}
                    onClose={() => setIsTokenPickerOpen(false)}
                    onSelect={tokenAddress => {
                      field.onChange(tokenAddress);
                      setIsTokenPickerOpen(false);
                    }}
                  />
                </>
              );
            }}
          />
        </ControlRow>

        <BlockButton type="submit">{t('saveAction')}</BlockButton>
      </form>
    </div>
  );
};

export default ERC20TransferEditor;
