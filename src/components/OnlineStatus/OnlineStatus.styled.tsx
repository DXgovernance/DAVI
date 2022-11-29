import styled from 'styled-components';

export const OnlineStatusWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
  border: ${({ theme }) => `1px solid ${theme.colors.border1}`};
  padding: 40px;
  border-radius: 4px;
`;

export const Title = styled.h3`
  margin-bottom: 0;
  font-size: 1.5rem;
`;
export const SubTitle = styled.p`
  font-size: 1rem;
`;
