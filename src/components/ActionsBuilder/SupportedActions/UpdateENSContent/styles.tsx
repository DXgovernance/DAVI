import styled from 'styled-components';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { Box } from 'components/primitives/Layout/Box';
import { StyledToolTip } from 'components/ToolTip';
import { DetailBody } from '../common/Summary.styled';

export const Control = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0;
  width: 100%;
`;

export const ControlLabel = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.proposalText.grey};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const ControlRow = styled(Box)`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

export const StyledInfoIcon = styled(StyledIcon)`
  &:hover + ${StyledToolTip} {
    visibility: visible;
  }
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const StyledENSIcon = styled(StyledIcon)`
  margin: 0;
  height: 1.4rem;
`;

export const DiffContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: 2px;
`;

export const DiffDetail = styled(DetailBody)`
  padding: 0.75rem 1rem;
  margin: 0;
`;

export const DiffStat = styled.span<{ removed?: boolean }>`
  margin: 0 0.2rem;
  color: ${({ removed, theme }) =>
    removed ? theme.colors.red : theme.colors.green};
`;
