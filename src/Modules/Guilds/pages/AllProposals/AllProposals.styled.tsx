import styled from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';

export const ProposalsList = styled(Box)`
  margin-top: 1rem;
`;

export const ProposalListWrapper = styled.div<{ isSearchOpened: boolean }>`
  height: ${({ isSearchOpened }) => (isSearchOpened ? '43vh' : '50vh')};
  @media only screen and (min-width: 768px) {
    height: ${({ isSearchOpened }) => (isSearchOpened ? '68vh' : '75vh')};
  }
`;
