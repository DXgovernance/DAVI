import { Flex } from 'Components/Primitives/Layout';
import { Button } from 'old-components/Guilds/common/Button';
import styled from 'styled-components';

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

export const WarningRow = styled(Flex)`
  margin: 1rem;
`;
