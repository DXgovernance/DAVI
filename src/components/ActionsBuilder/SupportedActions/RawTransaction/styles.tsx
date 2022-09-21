import styled from 'styled-components';

export const StyledTextarea = styled.textarea<{ isInvalid?: boolean }>`
  resize: none;
  box-sizing: border-box;
  border: 1px solid
    ${({ theme, isInvalid }) =>
      isInvalid ? theme.colors.red : theme.colors.border1};
  border-radius: 1.5rem;
  padding: 0.5rem 1.2rem;
  height: 7rem;
  width: 100%;
  background-color: transparent;
  color: ${({ theme, isInvalid }) => {
    if (isInvalid) return theme.colors.red;
    return theme.colors.text;
  }};
  font-family: ${({ theme }) => theme.fonts.monospace};
  font-size: ${({ theme }) => theme.fontSizes.mono};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;
