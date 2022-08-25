import { Box } from 'components/primitives/Layout/Box';
import styled, { css } from 'styled-components';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import { Button } from 'components/primitives/Button';

export const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;

export const FunctionSignatureWrapper = styled.div`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-left: 1.5rem;
  margin-top: 0.5rem;
`;

export const DetailWrapper = styled(Box)`
  margin: 1.25rem 0rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.card.grey};
`;

interface TabButtonProps {
  active: boolean;
}
export const TabButton = styled(Button)<TabButtonProps>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: -1px;
  border-radius: 10px 10px 0px 0px;
  color: ${({ theme }) => theme.colors.proposalText.grey};

  ${({ active }) =>
    active &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.card.grey};
      color: ${({ theme }) => theme.colors.text};
    `}
`;
