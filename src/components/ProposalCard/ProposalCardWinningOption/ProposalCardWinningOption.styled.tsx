import { Button } from 'components/primitives/Button';
import styled from 'styled-components';
import { IconDetailWrapper } from '../ProposalCard.styled';

export const WinningOptionWrapper = styled(IconDetailWrapper)``;

export const OptionVotesAndLabelWrapper = styled(IconDetailWrapper)`
  display: flex;
  flex: none;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: 1rem 0rem 0rem 1rem;
  border-right: none;
  font-weight: 600;
  width: fit-content;
  height: 30px;
  padding: 0 12px;
`;

export const ActionDetailsButton = styled(Button)<{ isClickable: boolean }>`
  display: flex;
  justify-content: flex-start;
  flex: none;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: 0rem 1rem 1rem 0rem;
  height: 32px;
  width: fit-content;
  margin: 0;
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.grey};

  :hover {
    color: ${({ theme }) => theme.colors.text};
    ${({ isClickable }) =>
      isClickable
        ? `cursor: pointer;`
        : `cursor: default;
          `}
  }
`;

export const ActionCountWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const ActionCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.border1};
  border-radius: 50%;
  height: 24px;
  width: 24px;
  margin-right: 8px;
`;
