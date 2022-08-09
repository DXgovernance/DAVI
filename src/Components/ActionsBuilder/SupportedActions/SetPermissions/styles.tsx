import styled, { css } from 'styled-components';
import { Box } from 'Components/Primitives/Layout';
import { Button } from 'old-components/Guilds/common/Button';
import TokenAmountInput from 'old-components/Guilds/common/Form/TokenAmountInput';

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
