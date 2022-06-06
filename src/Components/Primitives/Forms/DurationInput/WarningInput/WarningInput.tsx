import { WarningContainer } from './WarningInput.styled';
import { WarningInputProps } from '../types';
import { useTranslation } from 'react-i18next';

const WarningInput: React.FC<WarningInputProps> = ({
  timeColumn,
  value,
  limit,
}) => {
  const { t } = useTranslation();

  if (value > limit.max) {
    return (
      <WarningContainer data-testid="warning-max">
        {t('durationWarningMessage', { value, timeColumn, limit })}
      </WarningContainer>
    );
  }
  return null;
};

export default WarningInput;
