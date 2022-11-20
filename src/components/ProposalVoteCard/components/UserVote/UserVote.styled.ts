import { Box } from 'components/primitives/Layout/Box';
import styled from 'styled-components';

export const Container = styled(Box)`
  margin: 1rem 0 0;
  border-radius: 0.375rem;
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSizes.label};
  background: ${({ theme }) => theme.colors.border1};
`;
