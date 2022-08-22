import { Button } from 'components/Primitives/Button';
import styled from 'styled-components';

export const EditButton = styled(Button).attrs({
  variant: 'secondary',
})`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.label};
  margin: 0;
  padding: 0.25rem 0.75rem;
`;
