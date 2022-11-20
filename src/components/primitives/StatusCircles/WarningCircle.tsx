import styled from 'styled-components';
import { Circle } from 'components/primitives/Layout';

export const WarningCircle = styled(Circle)`
  color: ${({ theme }) => theme.colors.red};
  border-color: ${({ theme }) => theme.colors.red};
  background-color: transparent;
`;
