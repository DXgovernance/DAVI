import { WarningContainer } from './WarningInput.styled';
import { WarningInputProps } from '../types';

const WarningInput: React.FC<WarningInputProps> = ({
  timeColumn,
  value,
  limit,
}) => {
  if (value > limit.max) {
    return (
      <WarningContainer data-testid="warning-max">
        Please change {value} input for the {timeColumn} column as it is over
        the limit. The maximum value allowed is {limit.max}
      </WarningContainer>
    );
  }
  return null;
};

export default WarningInput;
