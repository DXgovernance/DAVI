import styled from 'styled-components';

export const ErrorLabel = styled.span<{ margin?: string }>`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.label};
  ${({ margin }) => margin && `margin: ${margin}`}
`;
