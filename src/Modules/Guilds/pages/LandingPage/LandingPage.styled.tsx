import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex } from 'components/Primitives/Layout/Box';
import { Button } from 'components/Primitives/Button';

export const InputContainer = styled(Flex)`
  flex-direction: row;
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    grid-template-columns: 300px minmax(0, 1fr);
  }
`;

export const StyledButton = styled(Button).attrs(() => ({
  variant: 'secondary',
}))`
  margin-left: 1rem;
  width: 9rem;
  padding: 0.7rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardsContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1.7rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
