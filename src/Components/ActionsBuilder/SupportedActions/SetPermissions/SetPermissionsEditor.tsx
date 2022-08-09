import { useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import { Controller, useForm } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';

import { ParsedDataInterface, TABS } from './types';
import { ANY_FUNC_SIGNATURE, MAX_UINT } from 'utils';
import { resolveUri } from 'utils/url';
import { ActionEditorProps } from '..';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import validateSetPermissions from './validateSetPermissions';
import { StyledTokenAmount } from './styles';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'Components/Primitives/Forms/Control';
import {
  Error,
  FunctionSignatureWrapper,
  DetailWrapper,
  TabButton,
} from './SetPermissionsEditor.styled';
import { Button } from 'old-components/Guilds/common/Button';
import AddressInput from 'old-components/Guilds/common/Form/AddressInput';
import Input from 'old-components/Guilds/common/Form/Input';
import Avatar from 'old-components/Guilds/Avatar';
import { TokenPicker } from 'Components/TokenPicker';
import { DecodedCall } from 'Components/ActionsBuilder/types';

const Web3 = require('web3');
const web3 = new Web3();
const TRANSFER_SIGNATURE = web3.eth.abi.encodeFunctionSignature(
  'transfer(address,uint256)'
);
interface FormValues {
  tokenAddress: string;
  toAddress: string;
  amount: BigNumber | any;
  functionName: string;
  functionSignature: string;
}
const Permissions: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const parsedData = useMemo<ParsedDataInterface>(() => {
    if (!decodedCall) return null;
    const { to, functionSignature, valueAllowed, allowance } = decodedCall.args;
    const { asset, functionName, tab } = decodedCall.optionalProps;

    return {
      asset,
      to,
      functionSignature,
      valueAllowed,
      allowance,
      functionName,
      tab,
    };
  }, [decodedCall]);

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(parsedData.tab);

  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);
  const { chain } = useNetwork();

  const { control, handleSubmit, getValues, setValue } = useForm<FormValues>({
    resolver: validateSetPermissions,
    context: { t, activeTab },
    defaultValues: {
      tokenAddress: parsedData.asset,
      toAddress: parsedData.to,
      amount: parsedData?.valueAllowed,
      functionName: parsedData.functionName,
      functionSignature: parsedData.functionSignature,
    },
  });

  const { tokenAddress } = getValues();

  // Get token details from the token address
  const { tokens } = useTokenList(chain?.id);
  const token = useMemo(() => {
    if (!tokenAddress || !tokens) return null;

    return tokens.find(({ address }) => address === tokenAddress);
  }, [tokens, tokenAddress]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const updateFunctionSignature = (value: string) => {
    if (!value || value === '')
      return setValue('functionSignature', ANY_FUNC_SIGNATURE);

    // If the value already is encoded
    if (value.substring(0, 2) === '0x')
      return setValue('functionSignature', value);

    // if the value is the name of the function
    const functionSignature = web3.eth.abi.encodeFunctionSignature(value);

    return setValue('functionSignature', functionSignature);
  };

  const handleFunctionNameChange = (value: string) => {
    setValue('functionName', value);
    updateFunctionSignature(value);
  };

  const submitAction = (values: FormValues) => {
    const bigNumberMaxUINT = BigNumber.from(MAX_UINT);
    const isAssetTransferCall = activeTab === TABS.ASSET_TRANSFER;

    const newCall: DecodedCall = {
      ...decodedCall,
      args: {
        ...decodedCall.args,
        to: isAssetTransferCall ? values.tokenAddress : values.toAddress,
        valueAllowed: isAssetTransferCall ? bigNumberMaxUINT : values.amount,
        functionSignature: isAssetTransferCall
          ? TRANSFER_SIGNATURE
          : values.functionSignature,

        // "from" field set by default previously as guild id
      },
      optionalProps: {
        functionName: isAssetTransferCall ? '' : values.functionName,
        asset: isAssetTransferCall ? values.tokenAddress : '',
        tab: activeTab,
      },
    };
    console.log(newCall);
    onSubmit(newCall);
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
    const initTab = id === Number(parsedData.tab);
    // reset values
    setValue('toAddress', initTab ? parsedData.to : '');
    setValue('amount', BigNumber.from(initTab ? parsedData?.valueAllowed : 0));
    setValue('functionName', initTab ? parsedData.functionName : '');
    setValue('tokenAddress', initTab ? parsedData.asset : '');
    setValue('functionSignature', initTab ? parsedData.functionSignature : '');

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
                  <ControlLabel>{t('asset')}</ControlLabel>
                  <ControlRow onClick={() => setIsTokenPickerOpen(true)}>
                    <Input
                      {...field}
                      value={token?.symbol}
                      placeholder={t('token')}
                      aria-label="asset picker"
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
                    walletAddress={parsedData?.to || ''}
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
        {activeTab === TABS.FUNCTION_CALL && (
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
                        // onChange={value => {
                        //   field.onChange(value);
                        // }}
                        isInvalid={invalid && !!error}
                        name="to-address"
                        aria-label="to address input"
                        placeholder={t('ethereumAddress')}
                      />
                    </ControlRow>
                  </Control>
                  {invalid && !!error && <Error>{error}</Error>}
                </>
              );
            }}
          />
        )}
        {activeTab === TABS.FUNCTION_CALL && (
          <Controller
            name="functionName"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { invalid, error } = fieldState;
              const { functionSignature } = getValues();
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
                      {!!functionSignature && (
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
                      onChange={value => {
                        const newValue = BigNumber.from(value || '0');
                        field.onChange(newValue);
                      }}
                      aria-label="amount input"
                      decimals={token?.decimals}
                      value={BigNumber.from(
                        activeTab === TABS.ASSET_TRANSFER ? 0 : field.value || 0
                      )}
                      disabled={activeTab === TABS.ASSET_TRANSFER}
                      isInvalid={invalid && !!error}
                    />
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

/**
 * 
 * For assets tab: 
 * 1.  we should make the default be max amount 
 * 2. disable the toggle max button for now. 
 * 3 remove the "to address" input field. 
 * 4. set "to" value to the token address.
 * 5. hardcode function signature to "transfer(address,uint256)" (encoded)

For function call: 
1.  we should remove "Any address" from the "to" input. 
2. Then the default behaviour for value should be set to 0 and have "Max value" disabled.
3. si queremos el toAddres pero sin el toggle. por default siempre tienen que escribi el addres. 
4 queremos poder editar el amount value. sin el toggle




asset: dejarlo

toAddress: 
- assettransfer: no mostrarlo
- functioncall: mostrarlo sin el toggle. Siempre tienen que poner a mano

amount: 
- assettransfer: Siempre es maxValue. No mostrar el toggle y no mostrar innecesariamente el valor. Remover el toggle
- functioncall: Hay que poder editar el valor. Sin el toggle.




Cambios hechos: 
- En asset transfer: 
  - Solo se muestra el token picker y el amount input está deshabilitado. El valor es siempre MAX_AMOUNT
  - El "to" es addres del token
  - FunctionSignature es siempre transfer(address,uint256)" encodeada


- En function call: 
  - toAddress hay que setearlo manualmente, sin toggle any addres
  - Lo mismo con fucntion name
  - Lo mismo con amount. 

Preguntas: 


3. En los default values para las supported actions. Debería cambiar "function: ERC20GuildContract.getFunction('setPermission')," por ('setETHPermission')?

 */
