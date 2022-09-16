import { BigNumber } from 'ethers';
import { isHexString } from 'ethers/lib/utils';
import i18next from 'i18next';
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

  if (!isAddress(to)) errors.to = i18next.t('invalidAddress');
  if (!to) errors.to = i18next.t('addressIsRequired');

  if (!value || !BigNumber.isBigNumber(value))
    errors.value = i18next.t('invalidValue');

  if (!isHexString(data)) errors.data = i18next.t('dataIsNotAHexString');
  if (!data) errors.data = i18next.t('dataIsRequired');

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
