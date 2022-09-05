import styled from 'styled-components';
import { Circle } from 'components/primitives/Layout';

export const SuccessCircle = styled(Circle)`
  color: ${({ theme }) => theme.colors.params['2']};
  border-color: ${({ theme }) => theme.colors.params['2']};
  background-color: transparent;
`;
