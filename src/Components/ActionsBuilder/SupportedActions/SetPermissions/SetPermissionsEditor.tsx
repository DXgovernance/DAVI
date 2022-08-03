import { useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import { Controller, useForm } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';
import styled, { css } from 'styled-components';

import { ANY_FUNC_SIGNATURE, ZERO_ADDRESS } from 'utils';
import { ActionEditorProps } from '..';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { Button } from 'old-components/Guilds/common/Button';
import { Box } from 'Components/Primitives/Layout';
import { MAX_UINT, ANY_ADDRESS } from 'utils';
import { ParsedDataInterface } from './types';
import AddressInput from 'old-components/Guilds/common/Form/AddressInput';
import { StyledTokenAmount, ToggleWrapper, ToggleLabel } from './styles';
import Toggle from 'old-components/Guilds/common/Form/Toggle';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'Components/Primitives/Forms/Control';
import Input from 'old-components/Guilds/common/Form/Input';
import { resolveUri } from 'utils/url';
import Avatar from 'old-components/Guilds/Avatar';
import { ErrorLabel } from 'Components/Primitives/Forms/ErrorLabel';
import { TokenPicker } from 'Components/TokenPicker';
import validateSetPermissions from './validateSetPermissions';

const Web3 = require('web3');
const web3 = new Web3();
const TABS = {
  ASSET_TRANSFER: 0,
  FUNCTION_CALL: 1,
};

interface TabButtonProps {
  active: boolean;
}

const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;

const FunctionSignatureWrapper = styled.div`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-left: 1.5rem;
  margin-top: 0.5rem;
`;

const DetailWrapper = styled(Box)`
  margin: 1.25rem 0rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.card.grey};
`;

const TabButton = styled(Button)<TabButtonProps>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: -1px;
  border-radius: 10px 10px 0px 0px;
  color: ${({ theme }) => theme.colors.proposalText.grey};

  ${({ active }) =>
    active &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.card.grey};
      color: ${({ theme }) => theme.colors.text};
    `}
`;

const Permissions: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const parsedData = useMemo<ParsedDataInterface>(() => {
    if (!decodedCall) return null;
    const { functionName } = decodedCall;
    const { asset, to, functionSignature, valueAllowed, allowance } =
      decodedCall.args;

    return {
      asset,
      to,
      functionSignature,
      valueAllowed,
      allowance,
      functionName,
    };
  }, [decodedCall]);

  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(
    !!parsedData?.functionName && parsedData?.asset[0] === ZERO_ADDRESS
      ? TABS.FUNCTION_CALL
      : TABS.ASSET_TRANSFER
  );

  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);
  const [maxValueToggled, setMaxValueToggled] = useState(false);
  const { chain } = useNetwork();

  const [anyAddressToggled, setAnyAddressToggled] = useState(
    parsedData?.to[0] === ANY_ADDRESS
  );

  const { control, handleSubmit, getValues, setValue } = useForm({
    resolver: validateSetPermissions,
    context: { t, anyAddressToggled, activeTab },
    defaultValues: {
      tokenAddress: parsedData.asset[0],
      toAddress: parsedData.to[0],
      amount: parsedData?.valueAllowed[0],
      functionName: parsedData.functionName,
      functionSignature: parsedData.functionSignature,
    },
  });

  const { tokenAddress, functionSignature } = getValues();

  // Get token details from the token address
  const { tokens } = useTokenList(chain?.id);
  const token = useMemo(() => {
    if (!tokenAddress || !tokens) return null;

    return tokens.find(({ address }) => address === tokenAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, parsedData]);

  // function signature
  const updateFunctionSignature = (value: string) => {
    if (!value || value === '')
      return setValue('functionSignature', [ANY_FUNC_SIGNATURE]);

    // If the value already is encoded
    if (value.substring(0, 2) === '0x')
      return setValue('functionSignature', [value]);

    // if the value is the name of the function
    const functionSignature = web3.eth.abi.encodeFunctionSignature(value);
    return setValue('functionSignature', [functionSignature]);
  };

  const handleFunctionNameChange = (value: string) => {
    setValue('functionName', value);
    updateFunctionSignature(value);
  };

  const bigNumberMaxUINT = BigNumber.from(MAX_UINT);
  const handleToggleMaxValueChange = () => {
    // toggle on
    if (!maxValueToggled) setValue('amount', bigNumberMaxUINT);
    // toggle off
    if (maxValueToggled) setValue('amount', BigNumber.from(0));
    setMaxValueToggled(!maxValueToggled);
  };

  const handleToggleAnyAddressChange = () => {
    if (!anyAddressToggled) setValue('toAddress', ANY_ADDRESS);
    else setValue('toAddress', '');
    setAnyAddressToggled(!anyAddressToggled);
  };

  const submitAction = values => {
    const newcall = {
      ...decodedCall,
      ...(activeTab === TABS.FUNCTION_CALL && {
        functionName: values.functionName,
      }), // tokenAddress: "0xfFb1cd0F95368DDd06D556161c5D3d9f0f4Fe6d2"
      args: {
        ...decodedCall.args,
        ...(activeTab === TABS.ASSET_TRANSFER && {
          asset: [values.tokenAddress],
        }), // tokenAddress: "0xfFb1cd0F95368DDd06D556161c5D3d9f0f4Fe6d2"
        ...(activeTab === TABS.FUNCTION_CALL && {
          functionSignature: [values.functionSignature],
        }), // tokenAddress: "0xfFb1cd0F95368DDd06D556161c5D3d9f0f4Fe6d2"
        valueAllowed: [values.amount],
        to: [values.toAddress],
      },
    };
    onSubmit(newcall);
  };

  const tabArray = [
    {
      title: t('assetTransfer'),
      id: 'asset-transfer-tab',
    },
    {
      title: t('functionCall'),
      id: 'functions-call-tab',
    },
  ];

  const handleTabChange = (id: number) => {
    // reset values
    setValue('toAddress', parsedData.to[0]);
    setValue('amount', BigNumber.from(parsedData?.valueAllowed[0] || 0));
    setValue('functionName', parsedData.functionName);
    setValue('tokenAddress', parsedData.asset[0]);
    setValue('functionSignature', parsedData.functionSignature);

    // reset states
    setMaxValueToggled(false);
    setAnyAddressToggled(parsedData?.to[0] === ANY_ADDRESS);
    // change tab id
    setActiveTab(id);
  };

  return (
    <div>
      <DetailWrapper>
        {tabArray.map((tab, index) => (
          <TabButton
            aria-label={tab.title}
            data-testid={tab.id}
            active={activeTab === index}
            onClick={() => handleTabChange(index)}
            key={tab.id}
          >
            {tab.title}
          </TabButton>
        ))}
      </DetailWrapper>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        {activeTab === TABS.ASSET_TRANSFER && (
          <Controller
            name="tokenAddress"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { invalid, error } = fieldState;
              return (
                <Control>
                  <ControlLabel>Asset</ControlLabel>
                  <ControlRow onClick={() => setIsTokenPickerOpen(true)}>
                    <Input
                      {...field}
                      value={token?.symbol}
                      placeholder={t('token')}
                      isInvalid={invalid && !!error}
                      icon={
                        <div>
                          {tokenAddress && (
                            <Avatar
                              src={resolveUri(token?.logoURI)}
                              defaultSeed={tokenAddress}
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
                  <TokenPicker
                    walletAddress={parsedData?.to[0] || ''}
                    isOpen={isTokenPickerOpen}
                    onClose={() => setIsTokenPickerOpen(false)}
                    onSelect={asset => {
                      field.onChange(asset);
                      setIsTokenPickerOpen(false);
                    }}
                  />
                </Control>
              );
            }}
          />
        )}
        <Controller
          name="toAddress"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { invalid, error } = fieldState;

            return (
              <>
                <Control>
                  <ControlLabel>{t('toAddress')}</ControlLabel>
                  <ControlRow>
                    <AddressInput
                      {...field}
                      isInvalid={invalid && !!error}
                      name="to-address"
                      aria-label="to address input"
                      disabled={anyAddressToggled}
                      placeholder={t('ethereumAddress')}
                    />
                    <ToggleWrapper>
                      <Toggle
                        name="toggle-any-address"
                        aria-label="toggle any address"
                        value={anyAddressToggled}
                        onChange={handleToggleAnyAddressChange}
                      />
                      <ToggleLabel selected={anyAddressToggled}>
                        {t('anyAddress')}
                      </ToggleLabel>
                    </ToggleWrapper>
                  </ControlRow>
                </Control>
                {invalid && !!error && <Error>{error}</Error>}
              </>
            );
          }}
        />
        {activeTab === TABS.FUNCTION_CALL && (
          <Controller
            name="functionName"
            control={control}
            render={({ field: { ref, ...field }, fieldState, ...rest }) => {
              const { invalid, error } = fieldState;

              return (
                <>
                  <Control>
                    <ControlLabel>{t('functionName')}</ControlLabel>
                    <ControlRow>
                      <Input
                        {...field}
                        isInvalid={invalid && !!error}
                        name="function-signature"
                        aria-label="function signature input"
                        placeholder={t('functionName')}
                        onChange={e => handleFunctionNameChange(e.target.value)}
                      />
                    </ControlRow>
                    <ControlRow>
                      {field.value.substring(0, 2) !== '0x' && (
                        <FunctionSignatureWrapper>
                          {t('functionSignature')}: {functionSignature}
                        </FunctionSignatureWrapper>
                      )}
                    </ControlRow>
                  </Control>
                  {invalid && !!error && <Error>{error}</Error>}
                </>
              );
            }}
          />
        )}

        <Controller
          name="amount"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { invalid, error } = fieldState;
            return (
              <>
                <Control>
                  <ControlLabel>{t('amount')}</ControlLabel>
                  <ControlRow>
                    <StyledTokenAmount
                      {...field}
                      aria-label="amount input"
                      decimals={token?.decimals}
                      value={BigNumber.from(field.value || 0)}
                      disabled={maxValueToggled}
                      isInvalid={invalid && !!error}
                    />
                    <ToggleWrapper>
                      <Toggle
                        name="toggle-max-value"
                        aria-label="toggle max value"
                        value={maxValueToggled}
                        onChange={handleToggleMaxValueChange}
                      />
                      <ToggleLabel selected={maxValueToggled}>
                        {t('maxValue')}
                      </ToggleLabel>
                    </ToggleWrapper>
                  </ControlRow>
                </Control>
                {invalid && !!error && <Error>{error}</Error>}
              </>
            );
          }}
        />

        <Button m="1rem 0 0" fullWidth type="submit">
          {t('saveAction')}
        </Button>
      </form>
    </div>
  );
};

export default Permissions;
