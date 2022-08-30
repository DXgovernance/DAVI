import { Flex } from 'components/primitives/Layout';
import styled from 'styled-components';

export const TooltipContent = styled(Flex)<{ placement }>`
  position: absolute;
  width: 200px;
  /* Conditional styling */
  ${({ placement }) => {
    if (placement === 'bottom') {
      return `left: 50%;
              transform: translateX(-50%);`;
    } else if (placement === 'top') {
      return `left: 50%;
              top: 0;
              transform: translateX(-50%) translateY(-100%);`;
    } else {
      return ``;
    }
  }}
  /* Styles */
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.bg3};
  border: 1px solid ${({ theme }) => theme.colors.border1};
  padding: 8px 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const StyledSpan = styled.span`
  position: relative;
`;
