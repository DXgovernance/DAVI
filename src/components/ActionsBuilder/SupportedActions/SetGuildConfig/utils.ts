import { FIELDS } from './constants';
import { BigNumber } from 'ethers';
import { SetGuildConfigFields } from './types';

export const bn = (n: string | number | BigNumber) => BigNumber.from(n);

export const getUpdatedValues = (
  current: SetGuildConfigFields,
  modifyed: SetGuildConfigFields
): Partial<SetGuildConfigFields> => {
  if (!current || !modifyed) return {};
  return Object.keys(current).reduce((acc, key) => {
    if (!FIELDS.map(f => f.name).includes(key)) return acc;
    const currValue = bn(current[key] || 0);
    const newValue = bn(modifyed[key] || 0);

    if (!currValue.eq(newValue)) {
      return {
        ...acc,
        [key]: newValue,
      };
    }
    return acc;
  }, {});
};

export const pickUpdatedOrDefaultValue = (
  current: BigNumber,
  modifyed: BigNumber
): BigNumber => {
  if (!!current && BigNumber.isBigNumber(current)) {
    if (
      !!modifyed &&
      BigNumber.isBigNumber(modifyed) &&
      !bn(modifyed).eq(current)
    ) {
      return bn(modifyed);
    }
    return bn(current);
  } else if (!!modifyed && BigNumber.isBigNumber(modifyed)) {
    return bn(modifyed);
  }
  return BigNumber.from(0);
};
