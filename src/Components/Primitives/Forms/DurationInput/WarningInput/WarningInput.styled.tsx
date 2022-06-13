import { Flex } from 'Components/Primitives/Layout';
import styled from 'styled-components';

export const WarningContainer = styled(Flex)`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.red};
  border: 1px solid ${({ theme }) => theme.colors.red};
`;
