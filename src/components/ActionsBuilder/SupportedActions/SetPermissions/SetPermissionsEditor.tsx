import { useEffect, useMemo, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { ANY_FUNC_SIGNATURE, ZERO_ADDRESS } from 'utils';
import { ActionEditorProps } from '..';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import AssetTransfer from './AssetTransfer';
import FunctionCall from './FunctionCall';
import styled, { css } from 'styled-components';
import { Button } from 'old-components/Guilds/common/Button';
import { Box } from 'components/Primitives/Layout';
import { MAX_UINT, ANY_ADDRESS } from 'utils';
import { ParsedDataInterface, ValidationsInterface } from './types';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';

const Web3 = require('web3');
const web3 = new Web3();

interface TabButtonProps {
  active: boolean;
}

const DetailWrapper = styled(Box)`
  margin: 1.25rem 0rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.card.grey}; ;
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
  updateCall,
}) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(0);

  const { chain } = useNetwork();

  // parse transfer state from calls
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

  const validations = useMemo<ValidationsInterface>(() => {
    function isFunctionNameValid(value: string): boolean {
      const regexFunctionName = /(\w+)[(]{1}([a-zA-Z0-9,]*)[)]{1}/g;

      if (!value || value === '') return true;
      if (value.substring(0, 2) === '0x' && value.length === 10) return true;
      if (value.match(regexFunctionName)) return true;

      return false;
    }

    return {
      asset: utils.isAddress(parsedData?.asset[0]),
      to: utils.isAddress(parsedData?.to[0]),
      valueAllowed: BigNumber.isBigNumber(parsedData?.valueAllowed[0]),
      functionName: isFunctionNameValid(parsedData?.functionName),
    };
  }, [parsedData]);

  const [pickedAsset, setPickedAsset] = useState(parsedData?.asset[0]);

  // Get token details from the token address
  const { tokens } = useTokenList(chain?.id);
  const token = useMemo(() => {
    if (!pickedAsset || !tokens) return null;

    return tokens.find(({ address }) => address === pickedAsset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, parsedData]);

  const { data: tokenInfo } = useERC20Info(pickedAsset);

  //
  // Asset-related functions
  //

  const setAsset = (asset: string) => {
    decodedCall.args.asset = [asset];
    updateCall(decodedCall);
  };
  const handleAssetChange = (asset: string) => {
    setAsset(asset);
    setPickedAsset(asset);
  };
  useEffect(() => {
    if (activeTab === 0) setAsset(pickedAsset);
    if (activeTab === 1) setAsset(ZERO_ADDRESS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  //
  // Function and function signature related functions
  //

  // function signature
  const setFunctionSignature = (value: string) => {
    // If value is empty
    if (!value || value === '') {
      updateCall({
        ...decodedCall,
        functionName: '',
        args: {
          ...decodedCall.args,
          functionSignature: [ANY_FUNC_SIGNATURE],
        },
      });
    }

    // If the value already is encoded
    else if (value.substring(0, 2) === '0x') {
      updateCall({
        ...decodedCall,
        functionName: value,
        args: {
          ...decodedCall.args,
          functionSignature: [value],
        },
      });
    }

    // if the value is the name of the function
    else {
      const functionSignature = web3.eth.abi.encodeFunctionSignature(value);
      updateCall({
        ...decodedCall,
        functionName: value,
        args: {
          ...decodedCall.args,
          functionSignature: [functionSignature],
        },
      });
    }
  };

  // It has two values for functionSignature: a custom one that is set and modified
  // when the input is modified in FunctionCall component
  // and the ANY_FUNC_SIGNATURE that is switched when in AssetTransfer component
  const [customFunctionName, setCustomFunctionName] = useState(
    parsedData?.functionName
  );
  const handleCustomFunctionSignature = (value: string) => {
    setCustomFunctionName(value);
    setFunctionSignature(value);
  };
  useEffect(() => {
    if (activeTab === 0) setFunctionSignature(ANY_FUNC_SIGNATURE);
    if (activeTab === 1) setFunctionSignature(customFunctionName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  //
  // Amount related functions
  //

  // valueAllowed
  const setAmount = (valueAllowed: BigNumber) => {
    updateCall({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        valueAllowed: [valueAllowed],
      },
    });
  };

  const [customAmountValue, setCustomAmountValue] = useState(
    parsedData?.valueAllowed[0]
  );
  // This function was implemented to avoid the amount input to
  // change to MAX_UINT toggling to "Max value"
  const handleTokenAmountInputChange = (e: BigNumber) => {
    setAmount(e);
    setCustomAmountValue(e);
  };

  const [maxValueToggled, setMaxValueToggled] = useState(false);
  const bigNumberMaxUINT = BigNumber.from(MAX_UINT);
  const handleToggleMaxValueChange = () => {
    if (!maxValueToggled) setAmount(bigNumberMaxUINT);
    else setAmount(customAmountValue);
    setMaxValueToggled(!maxValueToggled);
  };

  //
  // To-Address related functions
  //

  const [customToAddress, setCustomToAddress] = useState(parsedData?.to[0]);
  const [anyAddressToggled, setAnyAddressToggled] = useState(
    parsedData?.to[0] === ANY_ADDRESS
  );
  // to address
  const setToAddress = (to: string) => {
    updateCall({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        to: [to],
      },
    });
  };

  const handleToggleAnyAddressChange = () => {
    if (!anyAddressToggled) setToAddress(ANY_ADDRESS);
    else setToAddress(customToAddress);
    setAnyAddressToggled(!anyAddressToggled);
  };

  const handleCustomAddress = (value: string) => {
    setCustomToAddress(value);
    if (value === '') {
      setToAddress(ANY_ADDRESS);
    } else {
      setToAddress(value);
    }
  };

  // If the 'to' address is ANY_ADDRESS, set customAmount to '', to
  // show the address input empty, instead of the long 0xAaaAaaa address
  useEffect(() => {
    if (parsedData?.to[0] === ANY_ADDRESS) handleCustomAddress('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabArray = [
    {
      title: t('assetTransfer'),
      id: 'asset-transfer-tab',
      component: () => (
        <AssetTransfer
          validations={validations}
          parsedData={parsedData}
          tokenInfo={tokenInfo}
          token={token}
          customAmountValue={customAmountValue}
          handleTokenAmountInputChange={handleTokenAmountInputChange}
          maxValueToggled={maxValueToggled}
          handleToggleMaxValueChange={handleToggleMaxValueChange}
          handleAssetChange={handleAssetChange}
          customToAddress={customToAddress}
          handleCustomAddress={handleCustomAddress}
          pickedAsset={pickedAsset}
          anyAddressToggled={anyAddressToggled}
          handleToggleAnyAddressChange={handleToggleAnyAddressChange}
        />
      ),
    },
    {
      title: t('functionCall'),
      id: 'functions-call-tab',
      component: () => (
        <FunctionCall
          validations={validations}
          parsedData={parsedData}
          handleCustomFunctionSignature={handleCustomFunctionSignature}
          customToAddress={customToAddress}
          handleCustomAddress={handleCustomAddress}
          customFunctionName={customFunctionName}
          tokenInfo={tokenInfo}
          customAmountValue={customAmountValue}
          handleTokenAmountInputChange={handleTokenAmountInputChange}
          maxValueToggled={maxValueToggled}
          handleToggleMaxValueChange={handleToggleMaxValueChange}
          anyAddressToggled={anyAddressToggled}
          handleToggleAnyAddressChange={handleToggleAnyAddressChange}
        />
      ),
    },
  ];

  return (
    <div>
      <DetailWrapper>
        {tabArray.map((tab, index) => (
          <TabButton
            aria-label={tab.title}
            data-testid={tab.id}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
            key={tab.id}
          >
            {tab.title}
          </TabButton>
        ))}
      </DetailWrapper>
      {tabArray[activeTab].component()}
    </div>
  );
};

export default Permissions;
