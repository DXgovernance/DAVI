// import useExecutableState from 'hooks/Guilds/useExecutableState';
import { Button } from 'old-components/common/Button';
import React from 'react';

interface ExecuteButtonProps {
  executeProposal: () => void;
}

const ExecuteButton: React.FC<ExecuteButtonProps> = ({ executeProposal }) => {
  return (
    <Button data-testid="execute-btn" onClick={() => executeProposal()}>
      Execute
    </Button>
  );
};

export default ExecuteButton;
