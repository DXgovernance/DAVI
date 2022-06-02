import { Flex } from 'Components/Primitives/Layout';
import { Button } from 'old-components/Guilds/common/Button';
import styled from 'styled-components';

export const Column = styled(Flex)`
  flex-direction: column;
  width: 100px;
  margin: 20px 10px;
`;

export const Container = styled(Flex)`
  flex-direction: row;
  justify-content: centre;
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
`;

export const WarningRow = styled(Flex)``;
