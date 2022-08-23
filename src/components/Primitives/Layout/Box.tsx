import styled from 'styled-components';

export const Box = styled.div<{
  margin?: number | string;
  padding?: number | string;
}>`
  box-sizing: 'border-box';
  min-width: 0;
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`;
