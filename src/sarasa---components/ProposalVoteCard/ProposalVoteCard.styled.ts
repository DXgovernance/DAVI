import { Button } from 'components/Primitives/Button';
import styled, { css } from 'styled-components';

export const ButtonsContainer = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 2.5rem;
`;

export const SmallButton = styled(Button)`
  margin: 0px;
  padding: 0.1rem 0.4rem;
  width: 60px;
`;

export const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
`;

export const VoteOptionsLabel = styled.div`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-bottom: 0.5rem;
`;

export const VoteActionButton = styled(Button)`
  height: 2.5rem;

  :disabled {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border.initial};
    color: ${({ theme }) => theme.colors.proposalText.grey};
    opacity: 1;
  }
`;

export const VoteOptionButton = styled(VoteActionButton)<{
  active?: boolean;
  selected?: boolean;
}>`
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.muted};

  :active {
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.border.hover};
  }

  ${({ active, selected }) =>
    (active || selected) &&
    css`
      color: ${({ theme }) => theme.colors.background};
      background-color: ${({ theme }) => theme.colors.border.hover};
    `}
`;
