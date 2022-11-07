import styled from 'styled-components';

export const StyledSegmentLink = styled.a`
  color: ${({ theme }) => theme.colors.grey};
  margin-right: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;
