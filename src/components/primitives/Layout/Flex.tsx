import styled from 'styled-components';

export const Flex = styled.div<{
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  margin?: number | string;
  padding?: number | string;
}>`
  display: Flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'center'};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.curved};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`;
