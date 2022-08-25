import styled from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';

export const Menu = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

export const MenuItem = styled.a`
  display: block;
  text-decoration: none;
  padding: 0.5rem 1rem;

  &:visited,
  &:active,
  &:link {
    text-decoration: none;
    decoration: none;
    color: inherit;
  }
`;
