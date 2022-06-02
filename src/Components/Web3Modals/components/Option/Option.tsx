import React from 'react';
import { LiveIndicator } from '../LiveIndicator';
import { OptionButton, OptionButtonText, IconWrapper } from './Option.styled';

export interface OptionProps {
  link?: string;
  size?: number;
  onClick?: () => void;
  icon: string;
  header: React.ReactNode | string;
  active?: boolean;
  dataTestId?: string;
}

export const Option: React.FC<OptionProps> = ({
  link = null,
  size = null,
  onClick = null,
  icon,
  header,
  active = false,
  dataTestId = '',
}) => {
  const content = (
    <OptionButton
      variant="secondary"
      onClick={onClick}
      active={active}
      data-testId={dataTestId}
    >
      <OptionButtonText>
        {active && <LiveIndicator />}
        {header}
      </OptionButtonText>
      <IconWrapper size={size}>
        {icon && <img src={icon} alt={'Icon'} />}
      </IconWrapper>
    </OptionButton>
  );
  if (link) {
    return <a href={link}>{content}</a>;
  }

  return content;
};
