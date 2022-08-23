import styled, { css } from 'styled-components';
import { Heading } from 'components/Primitives/Typography';
import { Box } from 'components/Primitives/Layout/Box';

export const SidebarCardHeader = styled(Heading)`
  font-weight: 600;
  margin: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const SidebarCardHeaderSpaced = styled(SidebarCardHeader)`
  display: flex;
  justify-content: space-between;
`;

export const SidebarCardContent = styled(Box)`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const cardWrapperStyles = css`
  margin-bottom: 1rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;
