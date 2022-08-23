import { Button } from 'components/Primitives/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ExecuteButtonProps {
  executeProposal: () => void;
}

export const ExecuteButton: React.FC<ExecuteButtonProps> = ({
  executeProposal,
}) => {
  const { t } = useTranslation();

  return (
    <Button data-testid="execute-btn" onClick={executeProposal}>
      {t('execute')}
    </Button>
  );
};
