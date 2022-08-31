import styled from 'styled-components';

export const TokenItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg4};
  }
`;

export const TokenDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TokenIcon = styled.div`
  margin-right: 1rem;
`;

export const TokenTicker = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.lineHeights.header1};
  padding-bottom: 0.1rem;
`;
export const TokenName = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.label};
`;
