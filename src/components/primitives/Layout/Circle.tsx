import styled from 'styled-components';

export const Circle = styled.div<{ size?: number }>`
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  height: ${({ size }) => (size ? size : '86px')};
  width: ${({ size }) => (size ? size : '86px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;
