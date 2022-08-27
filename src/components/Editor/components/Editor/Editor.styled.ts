import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { EditorContent } from '@tiptap/react';

export const EditorWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border.initial};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};
  display: flex;
  flex-direction: column;
  max-height: 26rem;
`;

export const Content = styled(EditorContent)`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 1rem;
  -webkit-overflow-scrolling: touch;
  ${css`
    .ProseMirror {
      > * + * {
        margin-top: 0.75em;
      }

      p.is-editor-empty:first-child::before {
        color: ${({ theme }) => transparentize(0.5, theme.colors.text)};
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
      }

      outline: none;
      min-height: 200px;

      ul,
      ol {
        padding: 0 1rem;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.1;
      }

      code {
        background-color: ${({ theme }) =>
          transparentize(0.8, theme.colors.muted)};
        color: ${({ theme }) => theme.colors.muted};
      }

      pre {
        background: ${({ theme }) => theme.colors.primary};
        border-radius: 10px;
        color: ${({ theme }) => theme.colors.background};
        padding: 0.75rem 1rem;

        code {
          background: none;
          color: inherit;
          font-size: 0.8rem;
          padding: 0;
        }
      }

      mark {
        background-color: #faf594;
      }

      img {
        height: auto;
        max-width: 100%;
      }

      hr {
        margin: 1rem 0;
      }

      blockquote {
        border-left: 2px solid
          ${({ theme }) => transparentize(0.9, theme.colors.primary)};
        padding-left: 1rem;
      }

      hr {
        border: none;
        border-top: 2px solid
          ${({ theme }) => transparentize(0.8, theme.colors.primary)};
        margin: 2rem 0;
      }

      ul[data-type='taskList'] {
        list-style: none;
        padding: 0;

        li {
          align-items: center;
          display: flex;

          > label {
            flex: 0 0 auto;
            margin-right: 0.5rem;
            user-select: none;
          }

          > div {
            flex: 1 1 auto;
          }
        }
      }
    }
  `}
`;
