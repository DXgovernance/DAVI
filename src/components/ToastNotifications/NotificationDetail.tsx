import styled from 'styled-components';

export const NotificationDetail = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.label};
  color: ${({ theme }) => theme.colors.border1};
  margin-top: 0.3rem;

  a {
    text-decoration: initial;
    color: ${({ theme }) => theme.colors.text};
  }
`;
