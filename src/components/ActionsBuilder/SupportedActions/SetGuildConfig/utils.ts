import { FIELDS } from './constants';
import { BigNumber } from 'ethers';
import { SetGuildConfigFields, ControlField } from './types';

export const bn = (n: string | number | BigNumber) => BigNumber.from(n);

type UpdatedValuesReturn = {
  [key in ControlField]: {
    newValue: BigNumber;
    currentValue: BigNumber;
  };
};
export const getUpdatedValues = (
  current: SetGuildConfigFields,
  modified: SetGuildConfigFields
): UpdatedValuesReturn | {} => {
  if (!current || !modified) return {};
  return Object.keys(current).reduce((acc, key) => {
    if (!FIELDS.map(f => f.name).includes(key)) return acc;
    const currentValue = bn(current[key] || 0);
    const newValue = bn(modified[key] || 0);

    if (!currentValue.eq(newValue)) {
      return {
        ...acc,
        [key]: { newValue, currentValue },
      };
    }
    return acc;
  }, {});
};

export const pickUpdatedOrDefaultValue = (
  current: BigNumber,
  modified: BigNumber
): BigNumber => {
  if (BigNumber.isBigNumber(current)) {
    if (BigNumber.isBigNumber(modified) && !bn(modified).eq(current)) {
      return bn(modified);
    }
    return bn(current);
  } else if (BigNumber.isBigNumber(modified)) {
    return bn(modified);
  }
  return bn(0);
};
