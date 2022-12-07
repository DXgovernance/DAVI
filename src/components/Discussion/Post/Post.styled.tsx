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
  padding: 1rem;
  background: ${({ theme }) => theme.colors.bg2};
  border-radius: ${({ theme }) => theme.radii.curved};
  border-top-left-radius: 0;

  a {
    color: ${({ theme }) => theme.colors.primary1};
  }
`;

export const PostEditedBadge = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.label};
  margin-left: 3px;
`;

export const PostMetadata = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border1};
  background-color: ${({ theme }) => theme.colors.bg2};
  border-radius: ${({ theme }) => theme.radii.curved};
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  width: 100%;
  max-width: 480px;
`;

export const PostMetadataImage = styled.a`
  width: 100%;
  padding-top: 56.25%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const PostMetadataContent = styled.div`
  padding: 0.5rem;

  small {
    color: ${({ theme }) => theme.colors.grey2};
  }

  h3 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.active};
  }

  p {
    color: ${({ theme }) => theme.colors.white};
    line-height: ${({ theme }) => theme.lineHeights.header1};
  }
`;

export const PostFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

type PostActionButtonProps = {
  active?: boolean;
};

export const PostActionButton = styled.button<PostActionButtonProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  color: ${props =>
    props.active
      ? ({ theme }) => theme.colors.active
      : ({ theme }) => theme.colors.grey};
  cursor: pointer;

  &:hover {
    color: ${props =>
      props.active
        ? ({ theme }) => theme.colors.active
        : ({ theme }) => theme.colors.grey2};
  }
`;

export const PostActionCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.label};
`;

export const PostOptions = styled.div`
  position: relative;
`;

export const PostPopover = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 3px;
  bottom: 100%;
  right: 0;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ theme }) => theme.radii.curved};
  background: ${({ theme }) => theme.colors.bg1};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 8px 0px rgb(0 0 0 / 20%);
`;

type PostOptionsButtonProps = {
  danger?: boolean;
};

export const PostOptionsButton = styled.button<PostOptionsButtonProps>`
  cursor: pointer;
  color: ${props =>
    props.danger
      ? ({ theme }) => theme.colors.red
      : ({ theme }) => theme.colors.white};
  padding: 0.25rem 1rem;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radii.curved};

  &:hover {
    background: ${props =>
      props.danger
        ? ({ theme }) => theme.colors.red
        : ({ theme }) => theme.colors.bg2};
    color: ${({ theme }) => theme.colors.white};
  }
`;
