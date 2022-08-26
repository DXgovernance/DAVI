import styled, { css } from 'styled-components';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'minimal';
  fullWidth?: boolean;
  m?: string | number;
};

const variantStyles = (variant = 'primary') =>
  ({
    primary: css<{
      padding?: string;
      margin?: string;
      active?: boolean;
      selected?: boolean;
    }>`
      border: 1px solid ${({ theme }) => theme.colors.border1};
      background-color: ${({ theme }) => theme.colors.primary1};
      color: ${({ theme }) => theme.colors.text};
      border-radius: ${({ theme }) => theme.radii.pill};
      padding: ${({ padding }) => (padding ? padding : ' 0.5rem 0.8rem')};
      margin: ${({ margin }) => (margin ? margin : '0.2rem')};

      :hover:enabled {
        border-color: ${({ theme }) => theme.colors.border3};
      }

      :active:enabled {
        border: 1px solid ${({ theme }) => theme.colors.border1};
      }

      ${({ active, selected }) =>
        (active || selected) &&
        css`
          background-color: ${({ theme }) => theme.colors.primary1};
          color: ${({ theme }) => theme.colors.bg1};
        `}
    `,
    secondary: css<{
      padding?: string;
      margin?: string;
      active?: boolean;
      selected?: boolean;
    }>`
      border: 1px solid ${({ theme }) => theme.colors.border1};
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text};
      border-radius: ${({ theme }) => theme.radii.pill};
      padding: ${({ padding }) => (padding ? padding : ' 0.5rem 0.8rem')};
      margin: ${({ margin }) => (margin ? margin : '0.2rem')};

      :hover:enabled {
        border-color: ${({ theme }) => theme.colors.border3};
      }

      :active:enabled {
        border: 1px solid ${({ theme }) => theme.colors.border1};
      }
      :disabled {
        color: ${({ theme }) => theme.colors.border1};
      }

      ${({ active, selected }) =>
        (active || selected) &&
        css`
          background-color: ${({ theme }) => theme.colors.primary1};
          color: ${({ theme }) => theme.colors.bg1};
        `}
    `,
    minimal: css`
      border: none;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text};

      :hover:enabled {
        color: ${({ theme }) => theme.colors.border1};
      }
    `,
  }[variant]);

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.body};

  :disabled {
    color: initial;
    opacity: 0.4;
    cursor: auto;
  }

  ${({ variant }) => variantStyles(variant)}
  ${({ fullWidth, m }) =>
    css`
      width: ${fullWidth ? '100%' : 'auto'};
      ${m ? ` margin: ${m};` : ''}};
    `}
`;

Button.defaultProps = {
  variant: 'primary',
};
