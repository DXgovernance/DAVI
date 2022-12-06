import { InputProps } from 'components/primitives/Forms/Input';
import { NumericalInput } from '../NumericalInput';

export const IntegerInput: React.FC<InputProps<string>> = ({
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <NumericalInput
      {...rest}
      value={value.replace('.', '')}
      onChange={input => onChange(input.replace('.', ''))}
      placeholder={placeholder || '0'}
    />
  );
};
