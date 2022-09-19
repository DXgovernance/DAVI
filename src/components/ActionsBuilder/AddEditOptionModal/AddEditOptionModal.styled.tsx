import styled from 'styled-components';
import { Button } from 'components/primitives/Button';
import { Bullet } from 'components/primitives/Bullet';

export const DeleteButton = styled(Button)`
  background: ${({ theme }) => theme.colors.border1};
  &:disabled {
    color: inherit;
  }
`;

export const Dot = styled(Bullet).attrs({ size: 10 })`
  background: ${({ theme, color }) => color ?? theme.colors.border1};
`;
