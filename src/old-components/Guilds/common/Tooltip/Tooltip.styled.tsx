import { Flex } from 'Components/Primitives/Layout';
import styled from 'styled-components';

export const TooltipContent = styled(Flex)<{ position }>`
  position: absolute;
  width: 200px;
  /* Conditional styling */
  ${({ position }) => {
    if (position === 'bottom') {
      return `left: 50%;
              transform: translateX(-50%);`;
    } else if (position === 'top') {
      return `left: 50%;
              top: 0;
              transform: translateX(-50%) translateY(-100%);`;
    } else {
      return ``;
    }
  }}
  /* Styles */
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.modalBackground};
  border: 1px solid ${({ theme }) => theme.colors.border.initial};
  padding: 8px 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const StyledSpan = styled.span`
  position: relative;
`;
