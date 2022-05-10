import useLocalStorageWithExpiry from 'hooks/Guilds/useLocalStorageWithExpiry';
import { useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useEditor(localPath: string) {
  const [proposalBodyHTML, setProposalBodyHTML] =
    useLocalStorageWithExpiry<string>(`${localPath}/html`, null, ttlMs);
  const [proposalBodyMd, setProposalBodyMd] = useLocalStorageWithExpiry<string>(
    `${localPath}/md`,
    null,
    ttlMs
  );

  return { Editor, html, md };
}

export default useEditor;

