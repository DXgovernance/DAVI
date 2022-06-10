import styled from 'styled-components';
import { IconButton } from 'old-components/Guilds/common/Button';
import { Flex, Box } from 'Components/Primitives/Layout/Box';
import { Badge } from 'old-components/Guilds/common/Badge';

export const FilterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const FilterRow = styled(Flex)`
  display: flex;
  flex-direction: row;

  @media only screen and (min-width: 768px) {
    justify-content: space-between;
    width: 100%;
  }
`;

export const ButtonContainer = styled(Flex)`
  flex-direction: row;
  justify-content: flex-end;
  width: 57%;
`;

export const StyledIconButton = styled(IconButton)<{
  padding?: string | number;
  marginLeft?: string | number;
}>`
  border-radius: 20px;
  padding: ${props => props.padding || '0.7rem 1.2rem'};
  margin: ${props => props.marginLeft};
`;

export const StyledInputWrapper = styled(Box)`
  margin-top: 1rem;
  width: 97%;
`;

export const FilterBadge = styled(Badge)`
  margin-left: 5px;
`;
