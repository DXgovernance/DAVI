import styled, { css } from 'styled-components';
import { Flex } from 'components/primitives/Layout/Flex';

type ContainerTextProps = {
  variant?: 'regular' | 'medium' | 'bold';
};

const variantStyles = (variant = 'regular') =>
  ({
    regular: css`
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
    `,
    medium: css`
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    `,

    bold: css`
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    `,
  }[variant]);

export const ContainerText = styled(Flex)<ContainerTextProps>`
  text-align: left;
  font-family: Inter;
  margin: 4px;
  font-style: normal;
  color: ${({ color, theme }) => color || theme.colors.text};
  ${({ variant }) => variantStyles(variant)}
`;

ContainerText.defaultProps = {
  variant: 'regular',
};
