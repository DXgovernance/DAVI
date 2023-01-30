import { BigNumber } from 'ethers';
import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import useStringToBigNumber from 'hooks/Guilds/conversions/useStringToBigNumber';
import { useEffect, useState } from 'react';
import { InputProps } from 'components/primitives/Forms/Input';
import { NumericalInput } from 'components/primitives/Forms/NumericalInput';
import { usePrevious } from 'utils';

export interface TokenAmountInputProps extends InputProps<BigNumber> {
  decimals?: number;
  ariaLabel?: string;
}

export const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
  value,
  onChange,
  decimals = 18,
  ariaLabel,
  ...rest
}) => {
  const [localAmount, setLocalAmount] = useState<string>('');
  const localAmountBN = useStringToBigNumber(localAmount, decimals);

  const valueAsString = useBigNumberToString(value, decimals);

  const prevDecimals = usePrevious(decimals);
  useEffect(() => {
    if (prevDecimals && decimals && prevDecimals !== decimals && value) {
      const valueNew = BigNumber.from(value)
        .div(BigNumber.from(10).pow(prevDecimals))
        .mul(BigNumber.from(10).pow(decimals));
      onChange(valueNew);
    }
  }, [prevDecimals, decimals, value, onChange]);

  useEffect(() => {
    if (localAmount === '' && localAmount !== valueAsString) {
      setLocalAmount(valueAsString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueAsString]);

  useEffect(() => {
    if (localAmount && localAmount.endsWith('.')) onChange(null);
    else onChange(localAmountBN);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localAmount]);

  const setAmountEnforceDecimals = (amount: string) => {
    const fraction = amount?.split('.')?.[1];
    if (fraction && fraction?.length > decimals) return;
    if (amount?.startsWith('.')) return;

    setLocalAmount(amount);
  };

  return (
    <NumericalInput
      value={localAmount}
      onChange={setAmountEnforceDecimals}
      ariaLabel={ariaLabel}
      {...rest}
    />
  );
};
