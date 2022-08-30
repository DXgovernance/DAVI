import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { EditorContent } from '@tiptap/react';

export const EditorWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.bg1};
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  flex-direction: column;
  max-height: 26rem;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.text};
  }
`;

export const Content = styled(EditorContent)`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 1rem;
  -webkit-overflow-scrolling: touch;
  ${css`
    .ProseMirror {
      font-size: ${({ theme }) => theme.fontSizes.header1};

      > * + * {
        margin-top: 0.75em;
      }

      p.is-editor-empty:first-child::before {
        color: ${({ theme }) => theme.colors.grey};
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
          transparentize(0.8, theme.colors.border1)};
        color: ${({ theme }) => theme.colors.border1};
      }

      pre {
        background: ${({ theme }) => theme.colors.primary1};
        border-radius: 10px;
        color: ${({ theme }) => theme.colors.bg1};
        padding: 0.75rem 1rem;

        code {
          background: none;
          color: inherit;
          font-size: 0.8rem;
          padding: 0;
        }
      }

      mark {
        background-color: ${({ theme }) => theme.colors.active};
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
          ${({ theme }) => transparentize(0.9, theme.colors.primary1)};
        padding-left: 1rem;
      }

      hr {
        border: none;
        border-top: 2px solid
          ${({ theme }) => transparentize(0.8, theme.colors.primary1)};
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
