import { BigNumber, utils } from 'ethers';

interface ValidField {
  isValid: boolean;
  msg: string;
}
interface validateERC20TransferProps {
  recipientAddress: string;
  amount: BigNumber;
  tokenAddress: string;
}

interface validateERC20TransferReturn {
  isValid: boolean;
  recipientAddress: ValidField;
  amount: ValidField;
  tokenAddress: ValidField;
}

const validateERC20Transfer = ({
  recipientAddress,
  amount,
  tokenAddress,
}: validateERC20TransferProps): validateERC20TransferReturn => {
  const result = {
    recipientAddress: { isValid: true, msg: '' },
    amount: { isValid: true, msg: '' },
    tokenAddress: { isValid: true, msg: '' },
  };
  if (!recipientAddress) {
    result.recipientAddress.isValid = false;
    result.recipientAddress.msg = 'Recipient address is required';
  }
  if (!amount) {
    result.amount.isValid = false;
    result.amount.msg = 'Amount is required';
  }
  if (!tokenAddress) {
    result.tokenAddress.isValid = false;
    result.tokenAddress.msg = 'Token address is required';
  }
  if (!utils.isAddress(tokenAddress)) {
    result.tokenAddress.isValid = false;
    result.tokenAddress.msg = 'Invalid token address';
  }
  if (!BigNumber.isBigNumber(amount)) {
    result.amount.isValid = false;
    result.amount.msg = 'Invalid amount';
  }
  if (!utils.isAddress(recipientAddress)) {
    result.recipientAddress.isValid = false;
    result.recipientAddress.msg = 'Invalid recipient address';
  }

  return {
    ...result,
    isValid: Object.values(result).every(field => field.isValid),
  };
};

export default validateERC20Transfer;
