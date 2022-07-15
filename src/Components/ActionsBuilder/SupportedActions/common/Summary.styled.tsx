import { Box } from 'Components/Primitives/Layout';
import styled from 'styled-components';

export const DetailRow = styled(Box)`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
`;

export const DetailHeader = styled(DetailRow)`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0;
`;

export const DetailBody = styled(DetailRow)`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-top: 0;
`;
