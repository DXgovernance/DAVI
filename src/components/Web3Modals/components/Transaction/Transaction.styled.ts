import styled from 'styled-components';
export const TransactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border1};
`;

export const Link = styled.a`
  text-decoration: none;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.2rem;
    color: ${({ theme }) => theme.colors.border1};
  }
`;

export const Icon = styled.div`
  height: 1rem;
  width: 1rem;
`;
