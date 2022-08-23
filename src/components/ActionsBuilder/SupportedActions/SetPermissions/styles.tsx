import styled, { css } from 'styled-components';
import { Box } from 'components/Primitives/Layout/Box';
import { Button } from 'components/Primitives/Button';
import { TokenAmountInput } from 'components/Primitives/Forms/TokenAmountInput';

interface ToggleLabelProps {
  selected: boolean;
}

export const ClickableIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const OneLineButton = styled(Button)`
  margin-left: 1rem;
  white-space: nowrap;
`;

export const StyledTokenAmount = styled(TokenAmountInput)`
  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.proposalText.grey} !important;
    `}
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

export const ToggleLabel = styled.div<ToggleLabelProps>`
  white-space: nowrap;
  margin-left: 1rem;
  ${({ selected }) =>
    !selected &&
    css`
      color: ${({ theme }) => theme.colors.proposalText.grey} !important;
    `}
`;
