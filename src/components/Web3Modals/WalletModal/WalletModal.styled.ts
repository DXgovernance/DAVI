import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { Heading } from 'components/Primitives/Typography';

export const Container = styled.div`
  margin: 2rem;
`;

export const ConnectionError = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.red};
`;

export const BackIcon = styled(FiArrowLeft)`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  margin: 0;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const ButtonContainer = styled.div`
  margin: 1.5rem;
  text-align: center;
`;

export const TransactionsList = styled.div`
  margin: 1.5rem 0;
`;

export const TransactionsListHeading = styled(Heading)`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.proposalText.grey};
`;
