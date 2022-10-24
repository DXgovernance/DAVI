import { Input, InputProps } from 'components/primitives/Forms/Input';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { isAddress, MAINNET_ID } from 'utils';
import { IconRight } from '../IconRight';
import { useState } from 'react';

const AddressInput: React.FC<InputProps<string>> = ({
  value,
  onChange,
  isInvalid,
  disabled = false,
  defaultValue,
  ariaLabel,
  ...rest
}) => {
  const { imageUrl } = useENSAvatar(value, MAINNET_ID);
  const shouldShowAvatar = !!isAddress(value) || value?.endsWith('.eth');
  const [disabledState, setDisabledState] = useState(
    defaultValue ? true : disabled
  );
  const iconRightProps = {
    disabled: disabledState,
    value,
    onChange,
    setDisabledState,
    defaultValue,
    type: 'address',
  };

  return (
    <Input
      {...rest}
      value={value}
      disabled={disabledState}
      icon={
        <div>
          {shouldShowAvatar && !isInvalid && (
            <Avatar src={imageUrl} defaultSeed={value} size={24} />
          )}
        </div>
      }
      iconRight={<IconRight {...iconRightProps} />}
      onChange={e => onChange(e.target.value)}
      isInvalid={isInvalid}
      aria-label={ariaLabel ? ariaLabel : 'address input'}
    />
  );
};

export default AddressInput;
