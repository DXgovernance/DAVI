import styled from 'styled-components';
import { Box } from 'components/Primitives/Layout/Box';

import { Heading } from 'components/Primitives/Typography';

export const DaoIcon = styled.img`
  height: 4rem;
  width: 4rem;
`;

export const Content = styled(Box)`
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;
export const DaoTitle = styled(Heading)`
  margin-left: 4px;
  line-height: 24px;
`;
