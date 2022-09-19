import { BigNumber } from 'ethers';
import { hexStripZeros, isHexString } from 'ethers/lib/utils';
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

  const isValueEmpty = (value: BigNumber) => {
    if (!value) return true;
    if (BigNumber.isBigNumber(value) && value.toString() === '0') return true;
    return false;
  };

  const isDataEmpty = (data: string) => {
    if (!data) return true;
    if (isHexString(data) && hexStripZeros(data) === '0x') return true;
    return false;
  };

  // There is a check at the start of each validation. If there is already
  // an error for that field, it doesn't perform any more validations.

  if (
    !errors.value &&
    !errors.data &&
    isValueEmpty(value) &&
    isDataEmpty(data)
  ) {
    errors.value = t('eitherDataOrValueRequired');
    errors.data = t('eitherDataOrValueRequired');
  }

  if (!errors.value && !BigNumber.isBigNumber(value)) {
    errors.value = t('invalidValue');
  }

  if (!errors.data && !isHexString(data)) {
    errors.data = t('dataIsNotAHexString');
  }

  if (!errors.to && !to) errors.to = t('addressIsRequired');
  if (!errors.to && !isAddress(to)) errors.to = t('invalidAddress');

  return {
    errors: Object.entries(errors).reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...(!!value && { [key]: value }), // remove keys that have no error value
      };
    }, {}),
    values,
  };
};

export default validateRawTransaction;
