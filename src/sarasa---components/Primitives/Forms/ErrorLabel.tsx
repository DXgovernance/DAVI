import styled from 'styled-components';

export const ErrorLabel = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.label};
`;
