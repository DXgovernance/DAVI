import { Loading } from 'components/Primitives/Loading';
import React from 'react';
import { LiveIndicator } from '../LiveIndicator';
import { OptionButton, OptionButtonText, IconWrapper } from './Option.styled';

export interface OptionProps {
  onClick?: () => void;
  icon: string;
  header: React.ReactNode | string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  dataTestId?: string;
}

export const Option: React.FC<OptionProps> = ({
  onClick = null,
  icon,
  header,
  active = false,
  loading = false,
  disabled = false,
  dataTestId = '',
}) => {
  const content = (
    <OptionButton
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      <OptionButtonText>
        {active && <LiveIndicator />}
        {loading && <Loading loading iconProps={{ size: 16 }} />}
        {header}
      </OptionButtonText>
      <IconWrapper>{icon && <img src={icon} alt={'Icon'} />}</IconWrapper>
    </OptionButton>
  );

  return content;
};
