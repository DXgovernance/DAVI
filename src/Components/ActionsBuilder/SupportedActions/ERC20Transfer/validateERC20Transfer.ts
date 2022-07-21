import { BigNumber, utils } from 'ethers';
import { TFunction } from 'react-i18next';

interface ValidateERC20TransferValues {
  recipientAddress: string;
  amount: any;
  tokenAddress: string;
}

interface Context {
  t: TFunction;
}

const validateERC20Transfer = (
  values: ValidateERC20TransferValues,
  { t }: Context
) => {
  const { recipientAddress, amount, tokenAddress } = values;
  let errors = {
    recipientAddress: null,
    amount: null,
    tokenAddress: null,
  };

  if (!utils.isAddress(tokenAddress)) {
    errors.tokenAddress = t('invalidTokenAddress');
  }
  if (!BigNumber.isBigNumber(amount)) {
    errors.amount = t('invalidAmount');
  }
  if (BigNumber.isBigNumber(amount) && amount.lte(0)) {
    errors.amount = t('amountCannotBeZero');
  }
  if (!utils.isAddress(recipientAddress)) {
    errors.recipientAddress = t('invalidRecipientAddress');
  }
  if (!recipientAddress) {
    errors.recipientAddress = t('recipientAddressIsRequired');
  }
  if (!amount) {
    errors.amount = t('amountIsRequired');
  }
  if (!tokenAddress) {
    errors.tokenAddress = t('tokenAddressIsRequired');
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

export default validateERC20Transfer;
