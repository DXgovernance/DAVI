import { BigNumber, utils } from 'ethers';
import { TFunction } from 'react-i18next';
import { removeNullValues } from 'utils';
import { TokenInfoWithType, TokenType } from 'hooks/Guilds/tokens/useTokenList';

interface ValidateTokenTransferValues {
  recipientAddress: string;
  amount: any;
  token: TokenInfoWithType;
}

interface Context {
  t: TFunction;
}

const validateERC20Transfer = (
  values: ValidateTokenTransferValues,
  { t }: Context
) => {
  const { recipientAddress, amount, token } = values;
  let errors = {
    recipientAddress: null,
    amount: null,
    token: null,
  };

  if (!token) {
    errors.token = t('tokenIsRequired');
  } else if (
    token.type === TokenType.ERC20 &&
    !utils.isAddress(token.address)
  ) {
    errors.token = t('invalidTokenAddress');
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

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateERC20Transfer;
