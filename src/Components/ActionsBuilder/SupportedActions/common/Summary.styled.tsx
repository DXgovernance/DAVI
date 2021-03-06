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
  white-space: pre-wrap;
`;

export const DetailBody = styled(DetailRow)`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-top: 0;
`;

export const RedHighlight = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;
