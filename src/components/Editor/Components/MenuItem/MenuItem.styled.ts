import styled from 'styled-components';

export const Item = styled.button<{ active?: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary1 : 'transparent'};
  border: none;
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.colors.grey2};
  height: 1.75rem;
  margin-right: 0.25rem;
  padding: 0.25rem;
  width: 1.75rem;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
