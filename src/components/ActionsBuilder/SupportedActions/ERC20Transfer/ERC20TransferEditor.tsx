import { ActionEditorProps } from '..';
import { Button } from 'components/primitives/Button';
import { Controller, useForm } from 'react-hook-form';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { TokenPicker } from 'components/TokenPicker';
import { Input } from 'components/primitives/Forms/Input';
import { TokenAmountInput } from 'components/primitives/Forms/TokenAmountInput';
import { Box } from 'components/primitives/Layout/Box';
import { BigNumber, utils } from 'ethers';
import {
  TokenInfoWithType,
  TokenType,
  useTokenList,
} from 'hooks/Guilds/tokens/useTokenList';
import { useMemo, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { MAINNET_ID } from 'utils';
import { resolveUri } from 'utils/url';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import validateERC20Transfer from './validateERC20Transfer';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { SupportedAction } from 'components/ActionsBuilder/types';
import ERC20 from 'contracts/ERC20.json';

const Error = styled(ErrorLabel)`
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
  token: TokenInfoWithType;
  amount: BigNumber;
  recipientAddress: string;
}

const ERC20TransferEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const { guildId } = useTypedParams();

  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id, true);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    if (decodedCall.callType === SupportedAction.ERC20_TRANSFER) {
      const token = tokens.find(token => token.address === decodedCall.to);
      return {
        source: decodedCall.from,
        token,
        amount: decodedCall.args._value,
        recipientAddress: decodedCall.args._to,
      };
    } else if (decodedCall.callType === SupportedAction.NATIVE_TRANSFER) {
      const token = tokens.find(token => token.type === TokenType.NATIVE);
      return {
        source: decodedCall.from,
        token,
        amount: decodedCall.value,
        recipientAddress: decodedCall.to,
      };
    } else {
      return null;
    }
  }, [decodedCall, tokens]);

  const { control, handleSubmit, getValues } = useForm({
    resolver: validateERC20Transfer,
    context: { t },
    defaultValues: parsedData,
  });

  const { recipientAddress } = getValues();
  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);

  const { imageUrl: destinationAvatarUrl } = useENSAvatar(
    recipientAddress,
    MAINNET_ID
  );

  const submitAction = (values: TransferValues) => {
    if (values.token.type === TokenType.ERC20) {
      const ERC20Contract = new utils.Interface(ERC20.abi);

      onSubmit({
        ...decodedCall,
        callType: SupportedAction.ERC20_TRANSFER,
        to: values.token.address,
        value: BigNumber.from(0),
        function: ERC20Contract.getFunction('transfer'),
        args: {
          _value: values.amount,
          _to: values.recipientAddress,
        },
      });
    } else {
      onSubmit({
        ...decodedCall,
        callType: SupportedAction.NATIVE_TRANSFER,
        to: values.recipientAddress,
        value: values.amount,
        function: null,
        args: null,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Controller
          name="recipientAddress"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { invalid, error } = fieldState;

            return (
              <Control>
                <ControlLabel>{t('recipient')}</ControlLabel>
                <ControlRow>
                  <Input
                    {...field}
                    placeholder={t('ethereumAddress')}
                    isInvalid={invalid && !!error}
                    onChange={e => field.onChange(e.target.value)}
                    icon={
                      <div>
                        {!invalid && !error && (
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
                {invalid && !!error && <Error>{error.message}</Error>}
              </Control>
            );
          }}
        />

        <ControlRow>
          <Controller
            name="amount"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { invalid, error } = fieldState;

              return (
                <Control>
                  <ControlLabel>{t('amount')}</ControlLabel>
                  <ControlRow>
                    <TokenAmountInput
                      {...field}
                      decimals={field.value?.decimals}
                      isInvalid={invalid && !!error}
                    />
                  </ControlRow>

                  {invalid && !!error && <Error>{error.message}</Error>}
                </Control>
              );
            }}
          />

          <Spacer />

          <Controller
            name="token"
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
                        value={field.value?.symbol}
                        placeholder={t('token')}
                        isInvalid={invalid && !!error}
                        icon={
                          <div>
                            {field.value && (
                              <Avatar
                                src={resolveUri(field.value?.logoURI)}
                                defaultSeed={field.value?.address}
                                size={18}
                              />
                            )}
                          </div>
                        }
                        iconRight={<FiChevronDown size={20} />}
                        readOnly
                      />
                    </ControlRow>
                    {invalid && !!error && <Error>{error.message}</Error>}
                  </Control>

                  <TokenPicker
                    {...field}
                    walletAddress={guildId}
                    isOpen={isTokenPickerOpen}
                    onClose={() => setIsTokenPickerOpen(false)}
                    showNativeToken={true}
                    onSelect={token => {
                      field.onChange(token);
                      setIsTokenPickerOpen(false);
                    }}
                  />
                </>
              );
            }}
          />
        </ControlRow>

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

export default ERC20TransferEditor;
