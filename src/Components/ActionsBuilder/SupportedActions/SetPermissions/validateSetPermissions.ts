import { utils, BigNumber } from 'ethers';
import { TFunction } from 'react-i18next';
import { ZERO_ADDRESS } from 'utils';

interface ValidateSetPermissionsValues {
  toAddress: string;
  tokenAddress: string;
  amount: any;
  functionName: string;
}

interface Context {
  t: TFunction;
  anyAddressToggled: boolean;
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
      errors.tokenAddress = 'Token is required';
    } else if (!utils.isAddress(tokenAddress)) {
      errors.tokenAddress = 'Invalid token address';
    }
  }

  if (activeTab === 1) {
    if (functionName || functionName.trim() !== '') {
      if (!functionName.match(regexFunctionName)) {
        if (
          functionName.substring(0, 2) !== '0x' &&
          functionName.length !== 10
        ) {
          errors.functionName = `Invalid function name`;
        } else {
          errors.functionName = 'Encoded signature is invalid';
        }
      }
    }
  }

  if (!toAddress) {
    errors.toAddress = 'Address is required';
  }
  console.log(amount);
  if (!BigNumber.isBigNumber(amount) && !amount) {
    errors.amount = t('amountCannotBeZero');
  } else if (BigNumber.isBigNumber(amount) && amount?.lte(0)) {
    errors.amount = t('amountCannotBeZero');
  }

  return {
    errors: Object.entries(errors).reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...(!!value && { [key]: value }), // remove keys that has no error value
      };
    }, {}),
    values,
  };
};

export default validateAssetTransferPermission;
