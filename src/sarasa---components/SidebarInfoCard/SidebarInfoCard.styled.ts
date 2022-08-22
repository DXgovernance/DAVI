import styled from 'styled-components';
import { Flex } from 'components/Primitives/Layout/Box';

export const Row = styled(Flex)`
  margin-bottom: 0.8rem;
  flex-direction: row;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.text};
`;

export const ColoredLabel = styled(Label)`
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};
`;
