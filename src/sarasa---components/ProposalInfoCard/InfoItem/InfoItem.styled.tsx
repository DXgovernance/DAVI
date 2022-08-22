import { Box } from 'components/Primitives/Layout/Box';
import styled, { css } from 'styled-components';

export const InfoItemWrapper = styled(Box)<{ clickable?: boolean }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-bottom: 1.25rem;
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
      :hover {
        color: ${({ theme }) => theme.colors.text};
      }
    `}
`;

export const InfoItemText = styled(Box)`
  width: 100%;
`;

export const InfoItemTitle = styled(Box)`
  margin-bottom: 0.4rem;
  font-weight: 600;
`;

export const InfoItemDescription = styled(Box)`
  font-size: 0.75rem;
`;

export const InfoItemLink = styled.a`
  height: 2rem;
  width: 2rem;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
