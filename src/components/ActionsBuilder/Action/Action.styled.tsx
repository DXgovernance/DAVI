import { EditButton, Grip } from '../common';
import { CardWrapper, Header } from 'components/Card';
import { Box } from 'components/primitives/Layout/Box';
import styled, { css } from 'styled-components';
import { CardStatus } from './Action';

export const CardWrapperWithMargin = styled(CardWrapper)<{
  cardStatus?: CardStatus;
}>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg1};
  margin-top: 0.8rem;
  border: 1px solid;
  border-color: ${({ cardStatus, theme }) =>
    cardStatus === CardStatus.dragging
      ? theme.colors.text
      : cardStatus === CardStatus.warning
      ? theme.colors.red
      : cardStatus === CardStatus.simulationFailed
      ? theme.colors.border2
      : theme.colors.border1};
  z-index: ${({ cardStatus }) =>
    cardStatus === CardStatus.dragging ? 999 : 'initial'};
  box-shadow: ${({ cardStatus }) =>
    cardStatus === CardStatus.dragging
      ? '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'
      : 'none'};
`;

export const CardHeader = styled(Header)`
  padding: 1rem 1.5rem;
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
  border: 1px solid ${({ theme }) => theme.colors.border1};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border3};
  }

  ${({ active }) =>
    active &&
    css`
      border-color: ${({ theme }) => theme.colors.border3};
    `}
`;

export const DetailWrapper = styled(Box)`
  padding: 1.25rem 1.5rem;
`;

export const Separator = styled(Box)<{ cardStatus?: CardStatus }>`
  border-top: 1px solid;
  border-color: ${({ cardStatus, theme }) =>
    cardStatus === CardStatus.dragging
      ? theme.colors.text
      : cardStatus === CardStatus.warning
      ? theme.colors.red
      : cardStatus === CardStatus.simulationFailed
      ? theme.colors.border2
      : theme.colors.border1};
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

export const SectionHeader = styled(Box)`
  margin-bottom: 0.5rem;
`;

export const SectionBody = styled(Box)`
  color: ${({ theme }) => theme.colors.grey};
`;
