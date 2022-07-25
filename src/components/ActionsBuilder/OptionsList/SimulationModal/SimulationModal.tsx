import { Flex } from 'components/Primitives/Layout';
import { Modal } from 'components/Primitives/Modal';
import PendingCircle from 'old-components/Guilds/common/PendingCircle';
import { FiX, FiCheck } from 'react-icons/fi';
import {
  Message,
  Muted,
  StatusWrapper,
  SuccessCircle,
  TenderlyLogo,
  WarningCircle,
} from './SimulationModal.styled';
import { Button } from 'old-components/Guilds/common/Button';
import { useTranslation } from 'react-i18next';
import tenderlyLogo from 'assets/images/tenderly-dark-mode.svg';
import { SimulationState } from '../types';

interface SimulationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  status: SimulationState;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({
  isOpen,
  onDismiss,
  status,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      header={t('simulations.verifyingActions')}
      maxWidth={390}
      zIndex={1000}
    >
      <Flex padding={`1.5rem`}>
        <StatusWrapper>
          <SimulationStatusWrapper status={status} />
          <Flex direction="row">
            <Muted>{t('poweredBy')}</Muted> <TenderlyLogo src={tenderlyLogo} />
          </Flex>
        </StatusWrapper>
        <Button
          disabled={status === SimulationState.pending}
          fullWidth
          onClick={onDismiss}
        >
          {t('dismiss')}
        </Button>
      </Flex>
    </Modal>
  );
};

const SimulationStatusWrapper = ({ status }) => {
  const { t } = useTranslation();

  switch (status) {
    case SimulationState.pending:
      return (
        <Flex>
          <PendingCircle height="86px" width="86px" color={'white'} />
          <Message>{t('simulations.verifyingActions')}</Message>
        </Flex>
      );
    case SimulationState.allPassed:
      return (
        <Flex>
          <SuccessCircle>
            <FiCheck size={40} />
          </SuccessCircle>
          <Message>{t('simulations.actionsVerified')}</Message>
        </Flex>
      );
    case SimulationState.someFailed:
      return (
        <Flex>
          <WarningCircle>
            <FiX size={40} />
          </WarningCircle>
          <Message>{t('simulations.actionsFailed')}</Message>
        </Flex>
      );
    default:
      return (
        <Flex>
          <WarningCircle>
            <FiX size={40} />
          </WarningCircle>
          <Message>{t('simulations.error')}</Message>
        </Flex>
      );
  }
};
