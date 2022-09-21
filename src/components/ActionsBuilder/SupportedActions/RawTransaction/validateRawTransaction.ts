import { BigNumber } from 'ethers';
import { hexStripZeros, isHexString } from 'ethers/lib/utils';
import { TFunction } from 'react-i18next';
import { isAddress } from 'utils';
import { RawTransactionValues } from './types';

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

  const checkValueEmpty = (value: BigNumber) => {
    const noValue = !value;
    if (noValue) return true;
    if (BigNumber.isBigNumber(value) && value.toString() === '0') return true;
    return false;
  };

  const checkDataEmpty = (data: string) => {
    if (!data) return true;
    if (isHexString(data) && hexStripZeros(data) === '0x') return true;
    return false;
  };

  const isValueEmpty = checkValueEmpty(value);
  const isDataEmpty = checkDataEmpty(data);

  // Data validations
  if (isValueEmpty) {
    if (!data) {
      errors.data = t('eitherDataOrValueRequired');
    } else if (!isHexString(data)) {
      errors.data = t('dataIsNotAHexString');
    } else if (hexStripZeros(data) === '0x') {
      errors.data = t('eitherDataOrValueRequired');
    } else if (data.length % 2 !== 0) {
      errors.data = t('dataIsOddLength');
    }
  } else if (data) {
    if (!isHexString(data)) {
      errors.data = t('dataIsNotAHexString');
    } else if (data.length % 2 !== 0) {
      errors.data = t('dataIsOddLength');
    }
  }

  // Value validations
  if (isDataEmpty) {
    if (!value) {
      errors.value = t('eitherDataOrValueRequired');
    } else if (!BigNumber.isBigNumber(value)) {
      errors.value = t('invalidValue');
    } else if (value.toString() === '0') {
      errors.value = t('eitherDataOrValueRequired');
    }
  } else if (value) {
    if (!BigNumber.isBigNumber(value)) {
      errors.value = t('invalidValue');
    }
  }

  if (!to) {
    errors.to = t('addressIsRequired');
  } else if (!isAddress(to)) {
    errors.to = t('invalidAddress');
  }

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
