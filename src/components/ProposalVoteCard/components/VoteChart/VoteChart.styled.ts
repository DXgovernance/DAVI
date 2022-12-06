import styled from 'styled-components';
import { FaFlagCheckered } from 'react-icons/fa';

export const VotesChartContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  margin: 10px 0px 40px 0px;
  width: 100%;
`;

export const VotesChartRow = styled.div`
  display: flex;
  flex: 1;
  height: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.border1};
  overflow: hidden;
`;

export const ChartBar = styled.div<{ percent?: number; color: string }>`
  width: ${({ percent }) => (percent ? `${percent}%` : '')};
  background: ${({ color }) => color};
  height: 0.75rem;
  overflow: hidden;
`;

// The margin top and height are different when quorum 0 or 100,
// becase the border radious of the container, the marker needs to touch the curved line.
export const VoteQuorumMarker = styled.div<{ quorum: number }>`
  height: ${({ quorum }) => (quorum === 0 || quorum === 100 ? '18px' : '14px')};
  margin-top: ${({ quorum }) =>
    quorum === 0 || quorum === 100 ? '10px' : '14px'};
  width: 1px;
  background: ${({ theme }) => theme.colors.border1};
`;

export const VoteQuorumLabel = styled.div<{ quorum: number }>`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ quorum, theme }) =>
    quorum < 10
      ? `0px ${theme.radii.pill} ${theme.radii.pill}`
      : quorum > 90
      ? `${theme.radii.pill} 0px ${theme.radii.pill} ${theme.radii.pill}`
      : `${theme.radii.pill}`};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  align-items: center;
  display: flex;

  span {
    margin-left: 2px;
  }
`;

// If quorum <10, we align to left the marker and label, and left position of container is quorum.
// if 10 < quorum < 90, we left position the container at the quorum - the half of the width of the label, centered flex.
// quorum > 90, we align the container at the quorum - the full width of the label, right alignment label and marker.
export const VoteQuorumContainer = styled.div<{ quorum: number }>`
  width: 65px;
  position: absolute;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: ${({ quorum }) =>
    quorum < 10 ? 'flex-start' : quorum > 90 ? 'flex-end' : 'center'};
  left: ${({ quorum }) =>
    quorum < 10
      ? `${quorum}%`
      : quorum > 90
      ? `calc(${quorum}% - 65px)`
      : `calc(${quorum}% - 32px)`};
`;

export const PaddedFlagCheckered = styled(FaFlagCheckered)`
  margin-right: 0.4rem;
`;
