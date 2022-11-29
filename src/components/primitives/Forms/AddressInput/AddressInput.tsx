import { Input } from 'components/primitives/Forms/Input';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { isAddress, MAINNET_ID } from 'utils';
import useENS from 'hooks/Guilds/ens/useENS';
import { useEffect, useState } from 'react';
import { AddressInputProps } from './types';
import { IconRight } from '../IconRight';

export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  isInvalid,
  disabled = false,
  enableENSName = true,
  defaultValue,
  ariaLabel,
  ...rest
}) => {
  const { imageUrl } = useENSAvatar(value, MAINNET_ID);
  const shouldShowAvatar = !!isAddress(value);

  const { name: parsedENSName } = useENS(value);

  const [localValue, setLocalValue] = useState(
    (enableENSName && parsedENSName) || value
  );

  const [disabledState, setDisabledState] = useState(
    defaultValue ? true : disabled
  );

  const { address: addressFromLocalValue } = useENS(
    localValue.endsWith('.eth') ? localValue : `${localValue}.eth`
  );
  const handleChange = value => {
    setLocalValue(value);
  };

  const iconRightProps = {
    disabled: disabledState,
    value,
    onChange: handleChange,
    setDisabledState,
    defaultValue,
    type: 'address',
  };

  useEffect(() => {
    if (enableENSName && addressFromLocalValue) onChange(addressFromLocalValue);
    else onChange(localValue);
  }, [localValue, enableENSName, addressFromLocalValue, onChange]);

  return (
    <Input
      {...rest}
      value={localValue}
      disabled={disabledState}
      data-testid="address input"
      icon={
        <div>
          {shouldShowAvatar && !isInvalid && (
            <Avatar
              src={imageUrl}
              defaultSeed={value}
              size={24}
              aria-label="address avatar"
              data-testid="address avatar"
            />
          )}
        </div>
      }
      iconRight={<IconRight {...iconRightProps} />}
      onChange={e => handleChange(e.target.value)}
      isInvalid={isInvalid}
      aria-label={ariaLabel ? ariaLabel : 'address input'}
    />
  );
};
