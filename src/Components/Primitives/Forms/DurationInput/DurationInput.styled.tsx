import { Flex } from 'Components/Primitives/Layout';
import { Button } from 'old-components/Guilds/common/Button';
import styled from 'styled-components';
import NumericalInput from 'old-components/Guilds/common/Form/NumericalInput';

export const Column = styled(Flex)`
  flex-direction: column;
  width: 100px;
  margin: 20px 10px;
`;

export const Container = styled(Flex)`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
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

export const NumberInput = styled(NumericalInput)`
  input {
    color: red;
  }
  /* ${({ value }) => (value === '0' ? 'color: red;' : 'color: blue;')} */
`;

export const WarningRow = styled(Flex)``;
