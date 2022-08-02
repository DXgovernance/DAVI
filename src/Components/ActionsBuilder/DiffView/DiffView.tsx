import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
import { useTheme } from 'styled-components';
import { DiffCode, DiffViewCodeFoldMessage } from './DiffView.styled';
import './syntax.css';

hljs.registerLanguage('json', json);

export interface DiffViewProps {
  oldCode: string;
  newCode: string;
}

export const DiffView: React.FC<DiffViewProps> = ({ oldCode, newCode }) => {
  const theme = useTheme();

  const highlightSyntax = (str: string) => (
    <DiffCode
      dangerouslySetInnerHTML={{
        __html: hljs.highlight(str, { language: 'json' }).value,
      }}
    />
  );

  return (
    <ReactDiffViewer
      oldValue={oldCode}
      newValue={newCode}
      splitView={false}
      extraLinesSurroundingDiff={2}
      disableWordDiff={false}
      compareMethod={DiffMethod.WORDS}
      showDiffOnly={true}
      useDarkTheme={true}
      styles={{
        variables: {
          dark: {
            diffViewerBackground: 'transparent',
            gutterBackground: 'transparent',
            gutterBackgroundDark: 'transparent',
            gutterColor: theme.colors.proposalText.grey,
            codeFoldGutterBackground: theme.colors.syntax.expBlue,
            codeFoldBackground: theme.colors.syntax.expLight,
            addedBackground: theme.colors.syntax.addLight,
            wordAddedBackground: theme.colors.syntax.addText,
            addedGutterBackground: theme.colors.syntax.add,
            addedGutterColor: theme.colors.text,
            removedBackground: theme.colors.syntax.removeLight,
            wordRemovedBackground: theme.colors.syntax.removeText,
            removedGutterBackground: theme.colors.syntax.remove,
            removedGutterColor: theme.colors.text,
            codeFoldContentColor: theme.colors.proposalText.grey,
          },
        },
      }}
      codeFoldMessageRenderer={totalFoldedLines => (
        <DiffViewCodeFoldMessage>
          Expand {totalFoldedLines} lines of code
        </DiffViewCodeFoldMessage>
      )}
      renderContent={highlightSyntax}
    />
  );
};
