import styled from 'styled-components';
import { Button } from 'components/primitives/Button';

export const DeleteButton = styled(Button)`
  background: ${({ theme }) => theme.colors.border1};
  &:disabled {
    color: inherit;
  }
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: ${({ theme, color }) => color ?? theme.colors.border1};
`;
