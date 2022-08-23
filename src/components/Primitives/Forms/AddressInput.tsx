import styled from 'styled-components';
import { Input, InputProps } from 'components/Primitives/Forms/Input';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { isAddress, MAINNET_ID } from 'utils';
import { Box } from 'components/Primitives/Layout/Box';
import { FiX } from 'react-icons/fi';

export const ClickableIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AddressInput: React.FC<InputProps<string>> = ({
  value,
  onChange,
  isInvalid,
  disabled = false,
  ...rest
}) => {
  const { imageUrl } = useENSAvatar(value, MAINNET_ID);
  const shouldShowAvatar = !!isAddress(value) || value?.endsWith('.eth');

  return (
    <Input
      {...rest}
      value={value}
      disabled={disabled}
      icon={
        <div>
          {shouldShowAvatar && !isInvalid && (
            <Avatar src={imageUrl} defaultSeed={value} size={24} />
          )}
        </div>
      }
      iconRight={
        <>
          {!disabled && value && (
            <ClickableIcon
              aria-label="clear address"
              onClick={() => onChange('')}
            >
              <FiX size={18} />
            </ClickableIcon>
          )}
        </>
      }
      onChange={e => onChange(e.target.value)}
      isInvalid={isInvalid}
    />
  );
};

export { AddressInput };
