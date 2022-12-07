import styled, { css } from 'styled-components';
import { Box } from 'components/primitives/Layout';
import { Button } from 'components/primitives/Button';

export const DiscussionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const DiscussionPostboxWrapper = styled.div`
  padding: 1rem 1.5rem;
`;

export const DiscussionPostboxInput = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ theme }) => theme.radii.curved};
  padding: 1rem;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const DiscussionMasterPosts = styled.div`
  padding: 0 1.5rem;
`;

export const DiscussionEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.grey};
`;

export const DiscussionMasterPost = styled.div`
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.border1};
  }
`;

export const DiscussionLoadMore = styled.div`
  display: flex;
  padding: 1rem 0;
  margin: 0 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border1};
`;

export const LoadMoreButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radii.curved};
  flex-grow: 1;
  margin: 0;
`;

export const cardWrapperStyles = css`
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;
