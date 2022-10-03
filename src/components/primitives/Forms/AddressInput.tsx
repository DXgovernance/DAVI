import styled from 'styled-components';
import { Input, InputProps } from 'components/primitives/Forms/Input';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { isAddress, MAINNET_ID } from 'utils';
import { Box } from 'components/primitives/Layout/Box';
import { IconRight } from './IconRight';
import { useState } from 'react';

export const ClickableIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const AddressInput: React.FC<InputProps<string>> = ({
  value,
  onChange,
  isInvalid,
  disabled = false,
  defaultValue,
  ...rest
}) => {
  const { imageUrl } = useENSAvatar(value, MAINNET_ID);
  const shouldShowAvatar = !!isAddress(value) || value?.endsWith('.eth');
  const [disabledState, setDisabled] = useState(defaultValue ? true : disabled);
  const iconRightProps = {
    disabled: disabledState,
    value,
    onChange,
    setDisabled,
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
    />
  );
};
