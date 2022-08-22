import styled, { useTheme } from 'styled-components';
import Switch, { ReactSwitchProps } from 'react-switch';
import { FormElementProps } from 'Components/Primitives/Forms/types';

const StyledSwitch = styled(Switch)<ReactSwitchProps>`
  border: 1px solid ${({ theme }) => theme.colors.muted};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.text};
  }

  .react-switch-bg {
    box-sizing: border-box;
  }
`;

const Toggle: React.FC<FormElementProps<boolean>> = ({
  value,
  onChange,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <StyledSwitch
      checked={value}
      onChange={(checked: boolean) => onChange(checked)}
      uncheckedIcon={false}
      checkedIcon={false}
      height={32}
      width={64}
      borderRadius={32}
      offColor={theme.colors.modalBackground}
      onColor={theme.colors.muted}
      handleDiameter={24}
      activeBoxShadow={`0 0 2px 3px ${theme.colors.muted}`}
      {...rest}
    />
  );
};

export default Toggle;
