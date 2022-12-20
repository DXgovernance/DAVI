// Based on https://github.com/levelkdev/dxswap-dapp/blob/master/src/components/Input/NumericalInput/index.tsx

import React, { useEffect, useState } from 'react';
import { Input, InputProps } from 'components/primitives/Forms/Input';
import { escapeRegExp } from 'utils';
import { IconRight } from './IconRight';

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const NumericalInput: React.FC<InputProps<string>> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  defaultValue,
  ariaLabel,
  isInvalid = false,
  iconRight = null,
  displayClearIcon = true,
  ...rest
}) => {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onChange(nextUserInput);
    }
  };
  useEffect(() => {
    setDisabledState(defaultValue ? true : disabled);
  }, [disabled, defaultValue]);

  const [disabledState, setDisabledState] = useState(
    defaultValue ? true : disabled
  );
  const iconRightProps = {
    disabled: disabledState,
    value,
    onChange: onChange,
    defaultValue,
    setDisabledState,
    type: 'number',
  };

  return (
    <Input
      {...rest}
      value={value}
      onChange={event => {
        // replace commas with periods, because Guilds exclusively uses period as the decimal separator
        enforcer(event.target.value.replace(/,/g, '.'));
      }}
      // universal input options
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder || '0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
      disabled={disabledState}
      iconRight={
        iconRight ? (
          iconRight
        ) : displayClearIcon ? (
          <IconRight {...iconRightProps} />
        ) : null
      }
      aria-label={ariaLabel ? ariaLabel : 'numerical input'}
      isInvalid={isInvalid}
    />
  );
};
