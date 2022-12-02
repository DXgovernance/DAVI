import styled from 'styled-components';

export const PostboxInput = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ theme }) => theme.radii.curved};
  padding: 1rem;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.grey};
  }
`;
