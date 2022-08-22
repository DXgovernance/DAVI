import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import moment, { Moment } from 'moment';
import { RegisterOptions } from 'react-hook-form';

import { RichContractFunctionParam } from 'hooks/Guilds/contracts/useRichContractRegistry';
import { isAddress } from 'utils';
import AddressInput from 'components/Primitives/Forms/AddressInput';
import { FormElementProps } from 'components/Primitives/Forms/types';
import DateInput, { InputType } from 'components/Primitives/Forms/DateInput';
import Input from 'components/Primitives/Forms/Input';
import NumericalInput from 'components/Primitives/Forms/NumericalInput';
import Toggle from 'components/Primitives/Forms/Toggle';
import TokenAmountInput from 'components/Primitives/Forms/TokenAmountInput';
import { DurationInput } from 'components/Primitives/Forms/DurationInput';
import { SwaprPicker } from 'components/SwaprPicker';

interface FormElementRendererProps extends FormElementProps<any> {
  param: RichContractFunctionParam;
}

const FormElementRenderer: React.FC<FormElementRendererProps> = ({
  param,
  value,
  onChange,
  ...remainingProps
}) => {
  const FormElement: React.FC<FormElementProps<any>> = useMemo(() => {
    switch (param.component) {
      case 'address':
        return AddressInput;
      case 'integer':
      case 'decimal':
        return NumericalInput;
      case 'date':
        return DateInput;
      case 'time':
        return DurationInput;
      case 'boolean':
        return Toggle;
      case 'tokenAmount':
        return TokenAmountInput;
      case 'contentHash':
        return Input;
      case 'swaprPicker':
        return SwaprPicker;
      default:
        return Input;
    }
  }, [param]);

  const props = useMemo(() => {
    switch (param.component) {
      case 'date':
        return {
          isUTC: true,
          inputType: InputType.DATE,
          value: value ? moment.unix(BigNumber.from(value).toNumber()) : value,
          onChange: (value: Moment) => onChange(BigNumber.from(value?.unix())),
        };
      case 'duration':
        return {
          value,
          onChange: (value: number) => onChange(value),
        };
      case 'tokenAmount':
        return {
          decimals: 18,
        };
      default:
        return {};
    }
  }, [param, value, onChange]);

  return (
    <FormElement
      value={value}
      onChange={onChange}
      {...props}
      {...remainingProps}
    />
  );
};

type Validations = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export const getDefaultValidationsByFormElement = (
  param: RichContractFunctionParam
) => {
  const validations: Validations = { required: 'This field is required.' };

  switch (param.component) {
    case 'address':
      validations.validate = (value: string) =>
        !!isAddress(value) || 'Invalid address.';
      break;
    case 'tokenAmount':
      validations.validate = (value: BigNumber) =>
        (value && value.gte(0)) || 'Token amount should not be negative.';
      break;
  }

  return validations;
};

export default FormElementRenderer;
