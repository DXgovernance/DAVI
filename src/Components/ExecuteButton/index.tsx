import { Button } from 'old-components/Guilds/common/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ExecuteButtonProps {
  executeProposal: () => void;
}

const ExecuteButton: React.FC<ExecuteButtonProps> = ({ executeProposal }) => {
  const { t } = useTranslation();

  return (
    <Button data-testid="execute-btn" onClick={() => executeProposal()}>
      {t('execute')}
    </Button>
  );
};

export default ExecuteButton;
