import styled from 'styled-components';
import { FaGripVertical } from 'react-icons/fa';

export const Grip = styled(FaGripVertical)`
  cursor: grabbing;
  color: ${({ theme }) => theme.colors.grey2};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
