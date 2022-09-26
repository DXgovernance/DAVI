import { FiUnlock, FiX } from 'react-icons/fi';
import { ClickableIcon } from './AddressInput';

export const IconRight = ({
  disabled = true,
  value,
  onChange,
  setDisabled,
  type,
}) => {
  const clearLabel = `clear ${type}`;

  if (!disabled && value) {
    return (
      <ClickableIcon aria-label={clearLabel} onClick={() => onChange('')}>
        <FiX size={18} />
      </ClickableIcon>
    );
  } else if (disabled) {
    return (
      <ClickableIcon
        aria-label="enable"
        onClick={() => {
          setDisabled(false);
          console.log(disabled);
        }}
      >
        <FiUnlock size={18} />
      </ClickableIcon>
    );
  } else return null;
};
