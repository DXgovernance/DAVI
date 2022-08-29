import styled from 'styled-components';
import { Heading } from 'components/primitives/Typography';
import { Link } from 'react-router-dom';
import { Button } from 'components/primitives/Button';
import { Box } from 'components/primitives/Layout/Box';

export const ProposalsList = styled(Box)`
  margin-top: 1rem;
`;

export const ProposalListWrapper = styled.div``;

export const StyledHeading = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 20px;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledButton = styled(Button)`
  white-space: nowrap;
  height: 45px;
`;
