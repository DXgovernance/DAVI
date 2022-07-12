import { EditButton, Grip } from '../common';
import { Button } from 'old-components/Guilds/common/Button';
import { CardWrapper, Header } from 'old-components/Guilds/common/Card';
import { Box } from 'Components/Primitives/Layout';
import styled, { css } from 'styled-components';
import { CardStatus } from './Action';

export const CardWrapperWithMargin = styled(CardWrapper)<{
  dragging?: boolean;
  cardStatus?: CardStatus;
}>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: 0.8rem;
  border: 1px solid;
  border-color: ${({ cardStatus, theme }) =>
    cardStatus === CardStatus.dragging
      ? theme.colors.text
      : cardStatus === CardStatus.warning
      ? theme.colors.red
      : cardStatus === CardStatus.simulationFailed
      ? theme.colors.orange
      : theme.colors.muted};
  z-index: ${({ dragging }) => (dragging ? 999 : 'initial')};
  box-shadow: ${({ dragging }) =>
    dragging ? '0px 4px 8px 0px rgba(0, 0, 0, 0.2)' : 'none'};
`;

export const CardHeader = styled(Header)`
  padding: 0.875rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardLabel = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const ChevronIcon = styled.span<{ active?: boolean }>`
  cursor: pointer;
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.hover};
  }

  ${({ active }) =>
    active &&
    css`
      border-color: ${({ theme }) => theme.colors.border.hover};
    `}
`;

export const DetailWrapper = styled(Box)`
  padding: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.initial};
`;

export const TabButton = styled(Button)<{ active?: boolean }>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};

  ${({ active }) =>
    active &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.text};
    `}
`;

export const GripWithMargin = styled(Grip)`
  margin-right: 1rem;
`;

export const EditButtonWithMargin = styled(EditButton)`
  margin-right: 0.625rem;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
