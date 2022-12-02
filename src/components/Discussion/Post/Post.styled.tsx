import styled from 'styled-components';

export const PostWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #a1a6b0;
`;

export const PostCreatorName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const PostCreatorAddressBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.label};
  background-color: #282b30;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 2px 8px;
  line-height: 20px;
`;

export const PostTime = styled.span``;

export const PostBody = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.primary1};
  }
`;

export const PostFooter = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const PostActionButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.grey};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.grey2};
  }

  &[data-selected] {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const PostActionCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.label};
`;
