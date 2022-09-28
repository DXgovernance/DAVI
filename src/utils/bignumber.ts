import { BigNumber } from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';

BigNumber.config({
  EXPONENTIAL_AT: [-100, 100],
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  DECIMAL_PLACES: 18,
  FORMAT: {
    groupSize: 3,
    groupSeparator: ' ',
    decimalSeparator: '.',
  },
});

/*  Since strictNullChecks is set to false in tsconfig, if a value
    is null, it'll still be considered valid.
    Passing a null value to BigNumber throws an error. To circumvent
    that limitation, a value could either be BigNumber or a string.
    This function prevents passing a string to a BigNumber method, and
    is used as a safeguard in cases where a value could be an empty
    string (not in cases that we actually want to pass a string to
    convert to BigNumber).
*/
export const preventEmptyString = (
  value: EthersBigNumber | string
): EthersBigNumber => {
  if (typeof value === 'string') return EthersBigNumber.from(0);
  else return value;
};

export { BigNumber };
