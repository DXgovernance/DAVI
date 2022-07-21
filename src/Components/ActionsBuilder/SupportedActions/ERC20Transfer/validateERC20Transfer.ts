import { BigNumber, utils } from 'ethers';

interface validateERC20TransferValues {
  recipientAddress: string;
  amount: any;
  tokenAddress: string;
}

const validateERC20Transfer = (values: validateERC20TransferValues) => {
  const { recipientAddress, amount, tokenAddress } = values;
  let errors = {
    recipientAddress: null,
    amount: null,
    tokenAddress: null,
  };

  if (!recipientAddress) {
    errors.recipientAddress = 'Recipient address is required';
  }
  if (!amount) {
    errors.amount = 'Amount is required';
  }
  if (!tokenAddress) {
    errors.tokenAddress = 'Token address is required';
  }
  if (!utils.isAddress(tokenAddress)) {
    errors.tokenAddress = 'Invalid token address';
  }
  if (!BigNumber.isBigNumber(amount)) {
    errors.amount = 'Invalid amount format';
  }
  if (BigNumber.isBigNumber(amount) && amount.lte(0)) {
    errors.amount = 'Amount cannot be zero';
  }
  if (!utils.isAddress(recipientAddress)) {
    errors.recipientAddress = 'Invalid recipient address';
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
