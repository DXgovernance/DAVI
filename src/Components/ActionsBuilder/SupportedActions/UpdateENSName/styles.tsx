import styled from 'styled-components';
import StyledIcon from 'old-components/Guilds/common/SVG';
import { Box } from 'Components/Primitives/Layout';
import { StyledToolTip } from 'old-components/Guilds/common/ToolTip';

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
  width: 1.4rem;
  height: 1.4rem;
`;

export const StyledSegmentLink = styled.a`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-right: 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;
