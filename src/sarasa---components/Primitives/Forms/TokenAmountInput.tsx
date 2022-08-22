import { BigNumber } from 'ethers';
import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import useStringToBigNumber from 'hooks/Guilds/conversions/useStringToBigNumber';
import { useEffect, useState } from 'react';
import { InputProps } from 'components/Primitives/Forms/Input';
import NumericalInput from 'components/Primitives/Forms/NumericalInput';

export interface TokenAmountInputProps extends InputProps<BigNumber> {
  decimals?: number;
}

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
  value,
  onChange,
  decimals = 18,
  ...rest
}) => {
  const [amount, setAmount] = useState<string>('');

  // Set the initial value as the amount
  const amountFromProps = useBigNumberToString(value, decimals);
  useEffect(() => {
    if (amountFromProps != null) {
      setAmount(amountFromProps.toString());
    }
  }, [amountFromProps]);

  // Call onChange when the amount changes
  const amountBN = useStringToBigNumber(amount, decimals);
  useEffect(() => {
    onChange(amountBN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountBN]);

  const setAmountEnforceDecimals = (amount: string) => {
    const fraction = amount?.split('.')?.[1];
    if (fraction && fraction?.length > decimals) return;

    setAmount(amount);
  };

  return (
    <NumericalInput
      value={amount}
      onChange={setAmountEnforceDecimals}
      {...rest}
    />
  );
};

export default TokenAmountInput;
