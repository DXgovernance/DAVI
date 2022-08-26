import styled from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';
import { IconButton } from 'components/primitives/Button';

export const PageContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 300px;
  }
`;

export const SidebarContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-left: 1rem;
  }
`;

export const PageContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-right: 1rem;
  }
`;

export const PageHeader = styled(Box)`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const PageTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;

  @media only screen and (min-width: 768px) {
    font-size: 1.4rem;
    font-weight: 700;
  }

  margin: 0;
  margin: 1rem 0;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0.6rem 0.8rem;
  margin-top: 5px;
`;

export const ProposalActionsWrapper = styled(Box)`
  margin-top: 2rem;
`;

export const HeaderTopRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
