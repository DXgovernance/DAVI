import { utils, BigNumber } from 'ethers';
import { TFunction } from 'react-i18next';
import { removeNullValues, ZERO_ADDRESS } from 'utils';
import { TABS } from './types';

interface ValidateSetPermissionsValues {
  toAddress: string;
  tokenAddress: string;
  amount: any;
  functionName: string;
  functionSignature: string;
}

interface Context {
  t: TFunction;
  activeTab: number;
}

const regexFunctionName = /(\w+)[(]{1}([a-zA-Z0-9,]*)[)]{1}/g;

const validateAssetTransferPermission = (
  values: ValidateSetPermissionsValues,
  { t, activeTab }: Context
) => {
  const { tokenAddress, toAddress, amount, functionName } = values;
  let errors = {
    tokenAddress: null,
    toAddress: null,
    amount: null,
    functionName: null,
  };
  if (activeTab === 0) {
    if (!tokenAddress || tokenAddress === ZERO_ADDRESS) {
      errors.tokenAddress = t('tokenAddressIsRequired');
    } else if (!utils.isAddress(tokenAddress)) {
      errors.tokenAddress = t('invalidTokenAddress');
    }
  }

  if (activeTab === 1) {
    if (functionName || functionName.trim() !== '') {
      if (!functionName.match(regexFunctionName)) {
        if (
          functionName.substring(0, 2) !== '0x' &&
          functionName.length !== 10
        ) {
          errors.functionName = t('invalidFunctionName');
        } else {
          errors.functionName = t('encodedSignatureIsInvalid');
        }
      }
    }
  }

  if (activeTab === TABS.FUNCTION_CALL) {
    if (!utils.isAddress(toAddress)) {
      errors.toAddress = t('invalidAddress');
    }
    if (!toAddress) {
      errors.toAddress = t('addressIsRequired');
    }
  }

  if (activeTab === TABS.FUNCTION_CALL) {
    if (!amount || !BigNumber.isBigNumber(amount)) {
      errors.amount = t('amountIsRequired');
    }
  }

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateAssetTransferPermission;
