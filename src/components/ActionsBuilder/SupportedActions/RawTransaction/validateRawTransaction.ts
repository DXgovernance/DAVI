import { BigNumber } from 'ethers';
import { TFunction } from 'react-i18next';
import { isAddress } from 'utils';
import { RawTransactionValues } from './RawTransactionEditor';

interface Context {
  t: TFunction;
}

const validateRawTransaction = (
  values: RawTransactionValues,
  { t }: Context
) => {
  const { to, value, data } = values;

  let errors = {
    to: null,
    value: null,
    data: null,
  };

  if (!value || !BigNumber.isBigNumber(value)) {
    errors.value = 'error';
  }

  if (!to || !isAddress(to)) {
    errors.to = 'error';
  }

  if (!data) {
    errors.data = 'error';
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

export default validateRawTransaction;
