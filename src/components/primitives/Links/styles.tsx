import styled from 'styled-components';
import { Box } from '../Layout';

export const StyledSegmentLink = styled.a`
  color: ${({ theme }) => theme.colors.grey};
  margin-right: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  overflow-wrap: break-word;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const LinkDetail = styled(Box)`
  margin-right: 0.5rem;
  overflow-wrap: break-word;
`;
