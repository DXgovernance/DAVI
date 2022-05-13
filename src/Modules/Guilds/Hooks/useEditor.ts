import Editor from 'Components/Editor/Editor';
import useLocalStorageWithExpiry from 'hooks/Guilds/useLocalStorageWithExpiry';
import { useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useEditor(localPath: string) {
  const [html, setProposalBodyHTML] = useLocalStorageWithExpiry<string>(
    `${localPath}/html`,
    null,
    ttlMs
  );
  const [md, setProposalBodyMd] = useLocalStorageWithExpiry<string>(
    `${localPath}/md`,
    null,
    ttlMs
  );

  const EditorComponent = () => (
    <Editor onHtmlChange={setProposalBodyHTML} onMdChange={setProposalBodyMd} />
  );

  return { EditorComponent, html, md };
}

export default useEditor;

