import styled from 'styled-components';

export const Item = styled.button<{ active?: boolean }>`
  background-color: ${props =>
    props.active ? 'white' : ({ theme }) => theme.colors.background};
  border: none;
  border-radius: 0.4rem;
  color: ${props => (props.active ? '#0d0d0d' : 'white')};
  height: 1.75rem;
  margin-right: 0.25rem;
  padding: 0.25rem;
  width: 1.75rem;
  cursor: pointer;

  &:hover: {
    background-color: white;
    color: #0d0d0d;
  }
`;
