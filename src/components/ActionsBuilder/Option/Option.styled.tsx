import { Box } from 'components/primitives/Layout/Box';
import styled from 'styled-components';

export const OptionWrapper = styled(Box)<{ dragging: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg1};
  padding: 1rem;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${({ dragging, theme }) =>
    dragging ? theme.colors.text : 'transparent'};
  z-index: ${({ dragging }) => (dragging ? 999 : 'initial')};
  box-shadow: ${({ dragging }) =>
    dragging ? '0px 4px 8px 0px rgba(0, 0, 0, 0.2)' : 'none'};
`;

export const DetailWrapper = styled(Box)`
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Detail = styled(Box)`
  display: inline-flex;
  margin-right: 0.75rem;
`;

export const ActionsWrapper = styled.div<{ indented?: boolean }>`
  margin-left: ${({ indented }) => (indented ? '1.75rem' : '0')};
`;
