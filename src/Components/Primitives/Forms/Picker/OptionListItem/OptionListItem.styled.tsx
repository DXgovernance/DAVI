import styled from 'styled-components';

export const OptionItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const OptionDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const OptionIcon = styled.div`
  margin-right: 1rem;
`;

export const OptionTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.lineHeights.header1};
  padding-bottom: 0.1rem;
`;
export const OptionSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  font-size: ${({ theme }) => theme.fontSizes.label};
`;

export const OptionRightData = styled.div`
  margin-left: 0.5rem;
`;
