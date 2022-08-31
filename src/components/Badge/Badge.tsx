import styled, { css } from 'styled-components';

export interface BadgeProps {
  size?: number;
  reverse?: boolean;
}

export const Badge = styled.div<BadgeProps>`
  border-radius: ${({ theme }) => theme.radii.rounded};
  background-color: ${({ theme }) => theme.colors.primary1};
  color: ${({ theme }) => theme.colors.bg1};
  width: ${({ size }) => (size ? `${size}px` : '20px')};
  height: ${({ size }) => (size ? `${size}px` : '20px')};
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  /* use reverse prop when willing inverse colors based on parent status */
  ${({ reverse }) =>
    reverse &&
    css`
      background-color: ${({ theme }) => theme.colors.bg1};
      color: ${({ theme }) => theme.colors.primary1};
    `}
`;
