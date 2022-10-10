import { FiUnlock, FiX } from 'react-icons/fi';
import { ClickableIcon } from './AddressInput';

export const IconRight = ({
  disabled,
  value,
  onChange,
  defaultValue,
  setDisabledState,
  type,
}) => {
  if (defaultValue) {
    return (
      <ClickableIcon
        aria-label="enable"
        onClick={() => {
          setDisabledState(false);
        }}
      >
        <FiUnlock size={18} />
      </ClickableIcon>
    );
  } else if (!disabled && value) {
    const clearLabel = `clear ${type}`;
    return (
      <ClickableIcon aria-label={clearLabel} onClick={() => onChange('')}>
        <FiX size={18} />
      </ClickableIcon>
    );
  } else return null;
};
