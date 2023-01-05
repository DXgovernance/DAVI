import styled from 'styled-components';
import { Button } from 'components/primitives/Button';

export const PostboxWrapper = styled.div`
  position: relative;
`;

export const PostboxInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ theme }) => theme.radii.curved};
  padding: 3px;
  background: ${({ theme }) => theme.colors.bg2};
`;

export const PostboxInput = styled.div`
  flex-grow: 1;
  padding: 0.55rem;

  &:focus {
    outline: none;
    border: none;
  }

  &:empty::before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const PostboxMentions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% + 1px);
  background: ${({ theme }) => theme.colors.bg1};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-top-left-radius: ${({ theme }) => theme.radii.curved};
  border-top-right-radius: ${({ theme }) => theme.radii.curved};
`;

export const PostboxUserMention = styled.div`
  padding: 0.5rem 1rem;
`;

export const PostboxButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radii.curved};
  margin: 0;
`;

export const ReplyTo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: -0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: small;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-top-left-radius: ${({ theme }) => theme.radii.curved};
  border-top-right-radius: ${({ theme }) => theme.radii.curved};
  background-color: ${({ theme }) => theme.colors.bg2};
  color: ${({ theme }) => theme.colors.white};
`;

export const ReplyToDetails = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.grey2};
`;

export const ReplyToCancel = styled.button`
  background: none;
  border: none;
  padding: 0;
  flex-shrink: 0;
  font-size: large;
  line-height: 1;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export const PostboxEditMenu = styled.div`
  button {
    border: none;
    background: none;
    padding: 0;
    color: ${({ theme }) => theme.colors.primary1};
    margin: 0.5rem 0;
    cursor: pointer;
  }
`;
