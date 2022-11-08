import styled from 'styled-components';

export const StyledSegmentLink = styled.a`
  color: ${({ theme }) => theme.colors.grey};
  margin-right: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  overflow-wrap: break-word;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const UnstyledExternalLink = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const BlockExplorerLinkContainer = styled.div`
  display: flex;
`;
