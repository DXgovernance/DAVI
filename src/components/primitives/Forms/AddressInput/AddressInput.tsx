import { Input } from 'components/primitives/Forms/Input';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { isAddress, MAINNET_ID } from 'utils';
import { FiX } from 'react-icons/fi';
import useENS from 'hooks/Guilds/ens/useENS';
import { useEffect, useState } from 'react';
import { ClickableIcon } from './AddressInput.styled';
import { AddressInputProps } from './types';

export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  isInvalid,
  disabled = false,
  enableENSName = true,
  ...rest
}) => {
  const { imageUrl } = useENSAvatar(value, MAINNET_ID);
  const shouldShowAvatar = !!isAddress(value);

  const { name: parsedENSName } = useENS(value);

  const [localValue, setLocalValue] = useState(
    (enableENSName && parsedENSName) || value
  );
  const { address: addressFromLocalValue } = useENS(
    localValue.endsWith('.eth') ? localValue : `${localValue}.eth`
  );

  useEffect(() => {
    if (enableENSName && addressFromLocalValue) onChange(addressFromLocalValue);
    else onChange(localValue);
  }, [localValue, enableENSName, addressFromLocalValue, onChange]);

  return (
    <Input
      {...rest}
      value={localValue}
      disabled={disabled}
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
      iconRight={
        <>
          {!disabled && value && (
            <ClickableIcon
              aria-label="clear address"
              data-testid="clear address"
              onClick={() => setLocalValue('')}
            >
              <FiX size={18} />
            </ClickableIcon>
          )}
        </>
      }
      onChange={e => setLocalValue(e.target.value)}
      isInvalid={isInvalid}
    />
  );
};
