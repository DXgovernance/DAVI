import { CardWrapper } from 'components/Card';
import { Flex } from 'components/primitives/Layout';
import { Heading } from 'components/primitives/Typography';
import styled from 'styled-components';

export const CardTitle = styled(Heading)`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 12px;
  @media only screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const FooterElement = styled(Flex)`
  flex-direction: row;
  column-gap: 10px;
  margin-right: 18px;
  font-weight: 600;
`;

export const MainWrapper = styled(CardWrapper)<{
  disabled?: boolean;
}>`
  margin-bottom: 1rem;
  padding: 20px 24px;
  color: ${({ theme }) => theme.colors.grey2};

  &:hover {
    ${({ theme, disabled }) =>
      disabled
        ? `cursor: default;`
        : `border-color: ${theme.colors.border3};
          color: ${theme.colors.text};`}
  }
`;
