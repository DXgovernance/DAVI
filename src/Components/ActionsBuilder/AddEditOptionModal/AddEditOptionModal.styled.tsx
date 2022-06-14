import styled from 'styled-components';
import { Button } from 'old-components/Guilds/common/Button';

export const DeleteButton = styled(Button)`
  background: ${({ theme }) => theme.colors.muted};
  &:disabled {
    color: inherit;
  }
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: ${({ theme, color }) => color ?? theme.colors.muted};
`;
