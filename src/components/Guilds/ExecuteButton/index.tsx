import useExecutableState from 'hooks/Guilds/useExecutableState';
import { Button } from 'old-components/common/Button';
import React from 'react';

const ExecuteButton: React.FC = () => {
  const {
    data: { isExecutable, executeProposal },
  } = useExecutableState();

  if (!isExecutable) return null;

  return (
    <Button data-testid="execute-btn" onClick={() => executeProposal()}>
      Execute
    </Button>
  );
};

export default ExecuteButton;
