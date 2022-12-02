import styled from 'styled-components';
import { PostWrapper } from '../Post/Post.styled';

export const ThreadGroup = styled.div`
  margin-left: 1rem;

  ${PostWrapper} {
    padding-left: 0.5rem;
    border-left: 1px solid ${({ theme }) => theme.colors.border1};
  }
`;
