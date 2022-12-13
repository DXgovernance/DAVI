import styled from 'styled-components';

export const ProposalDescriptionWrapper = styled.div`
  margin: 1.5rem 0;
  line-height: 1.5;
  font-size: 16px;
  word-break: break-word;
  text-align: left;
  color: ${({ theme }) => theme.colors.grey2};
`;
