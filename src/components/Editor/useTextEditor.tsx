import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Focus from '@tiptap/extension-focus';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor } from './components';
import TurndownService from 'turndown';
import useLocalStorageWithExpiry from 'hooks/Guilds/useLocalStorageWithExpiry';

const turndownService = new TurndownService();

export const useTextEditor = (
  localPath: string,
  ttlMs: number,
  placeholder: string
) => {
  const [html, onHTMLChange] = useLocalStorageWithExpiry<string>(
    `${localPath}/html`,
    null,
    ttlMs
  );
  const [md, onMdChange] = useLocalStorageWithExpiry<string>(
    `${localPath}/md`,
    null,
    ttlMs
  );
  const clear = () => {
    EditorConfig.commands.clearContent();
    onMdChange('');
    onHTMLChange('');
  };

  const EditorConfig = useEditor({
    content: html ? html : {},
    extensions: [
      StarterKit.configure({
        history: { depth: 10 },
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Placeholder.configure({
        placeholder,
      }),
      Highlight,
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html) {
        onHTMLChange && onHTMLChange(html);
        onMdChange && onMdChange(turndownService.turndown(html));
        // onJSONChange && onJSONChange(JSON.stringify(editor.getJSON()));
      }
    },
  });

  return { Editor, EditorConfig, html, md, clear };
};
