import { Flex } from 'Components/Primitives/Layout';
import { Button } from 'Components/Primitives/Button';
import styled from 'styled-components';

export const MainWrapper = styled(Flex)`
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Column = styled(Flex)`
  flex-direction: column;
  width: 70px;
  margin: 20px 10px;
`;

export const Container = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 1340px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const ColumnButton = styled(Button).attrs({
  variant: 'primary',
})`
  background-color: transparent;
  margin: 0;
  border: none;
  :hover:enabled {
    border-color: none;
  }
  :active:enabled {
    border: none;
  }
`;

export const StyledButton = styled(Button)`
  width: 150px;
`;

export const TransparentButton = styled(Button)`
  width: 100%;
  min-height: 37px;
  background-color: transparent;
  justify-content: flex-start;
  text-align: left;
`;
