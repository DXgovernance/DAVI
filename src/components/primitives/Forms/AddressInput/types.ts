import { InputProps } from 'components/primitives/Forms/Input';

export interface AddressInputProps extends InputProps<string> {
  enableENSName?: boolean;
}
