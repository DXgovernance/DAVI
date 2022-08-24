import { BigNumber } from 'ethers';
import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import useStringToBigNumber from 'hooks/Guilds/conversions/useStringToBigNumber';
import { useDebounce } from 'hooks/Guilds/useDebounce';
import { useEffect, useState } from 'react';
import { InputProps } from './Input';
import NumericalInput from './NumericalInput';

export interface TokenAmountInputProps extends InputProps<BigNumber> {
  decimals?: number;
}

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
  value,
  onChange,
  decimals = 18,
  ...rest
}) => {
  const [localAmount, setLocalAmount] = useState<string>('');
  const debouncedLocalAmount = useDebounce(localAmount, 350);
  const localAmountBN = useStringToBigNumber(localAmount, decimals);

  const valueAsString = useBigNumberToString(value, decimals);

  useEffect(() => {
    if (localAmount !== valueAsString) {
      setLocalAmount(valueAsString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueAsString]);

  useEffect(() => {
    onChange(localAmountBN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLocalAmount]);

  const setAmountEnforceDecimals = (amount: string) => {
    const fraction = amount?.split('.')?.[1];
    if (fraction && fraction?.length > decimals) return;

    setLocalAmount(amount);
  };

  return (
    <NumericalInput
      value={localAmount}
      onChange={setAmountEnforceDecimals}
      {...rest}
    />
  );
};

export default TokenAmountInput;
