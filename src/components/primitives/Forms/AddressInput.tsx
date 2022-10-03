import styled from 'styled-components';
import { Input, InputProps } from 'components/primitives/Forms/Input';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { isAddress, MAINNET_ID } from 'utils';
import { Box } from 'components/primitives/Layout/Box';
import { FiX } from 'react-icons/fi';
import useENS from 'hooks/Guilds/ens/useENS';
import { useEffect, useState } from 'react';

export const ClickableIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface AddressInputProps extends InputProps<string> {
  enableENSName?: boolean;
}

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

  const { name: parsedName } = useENS(value);

  const [localValue, setLocalValue] = useState(
    (enableENSName && parsedName) || value
  );
  const { address: addressFromLocalValue } = useENS(localValue);

  useEffect(() => {
    if (enableENSName && addressFromLocalValue) onChange(addressFromLocalValue);
    else onChange(localValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue, enableENSName, addressFromLocalValue]);

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
