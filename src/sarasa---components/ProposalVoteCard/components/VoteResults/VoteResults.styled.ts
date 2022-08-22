import styled from 'styled-components';

export const VotesRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin: 5px 0px 5px 0px;
`;

export const VoteOption = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionBullet = styled.span`
  margin-right: 0.5rem;
`;
