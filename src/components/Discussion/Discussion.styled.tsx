import styled, { css } from 'styled-components';
import { Heading } from 'components/primitives/Typography';
import { Box } from 'components/primitives/Layout';

export const DiscussionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DiscussionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 1px solid #303338;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 8px 0px rgb(0 0 0 / 20%);
`;

export const DiscussionTitle = styled(Heading)`
  font-weight: 600;
  margin: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
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

export const DiscussionMasterPostWrapper = styled.div`
  padding: 0 1.5rem;
`;

export const cardWrapperStyles = css`
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;
