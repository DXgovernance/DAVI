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
  modifyed: SetGuildConfigFields
): UpdatedValuesReturn | {} => {
  if (!current || !modifyed) return {};
  return Object.keys(current).reduce((acc, key) => {
    if (!FIELDS.map(f => f.name).includes(key)) return acc;
    const currentValue = bn(current[key] || 0);
    const newValue = bn(modifyed[key] || 0);

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
  modifyed: BigNumber
): BigNumber => {
  if (BigNumber.isBigNumber(current)) {
    if (BigNumber.isBigNumber(modifyed) && !bn(modifyed).eq(current)) {
      return bn(modifyed);
    }
    return bn(current);
  } else if (BigNumber.isBigNumber(modifyed)) {
    return bn(modifyed);
  }
  return bn(0);
};
