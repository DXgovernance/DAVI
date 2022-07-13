import { Circle, Flex } from 'Components/Primitives/Layout';
import { Modal } from 'Components/Primitives/Modal';
import PendingCircle from 'old-components/Guilds/common/PendingCircle';
import { useMemo } from 'react';
import { Option } from '../types';
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

interface SimulationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  options: Option[];
}

enum SimulationState {
  pending,
  allPassed,
  someFailed,
  chainNotSupported,
}

const SimulationModal: React.FC<SimulationModalProps> = ({
  isOpen,
  onDismiss,
  options,
}) => {
  const { t } = useTranslation();
  const simulationState = useMemo(() => {
    return SimulationState.pending;
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      header={t('simulations.verifyingActions')}
      zIndex={1000}
      cancelText="dismiss"
    >
      <Flex padding={`1.5rem`}>
        <StatusWrapper>
          <Flex>
            {simulationState === SimulationState.pending ? (
              <SimulationPending />
            ) : simulationState === SimulationState.allPassed ? (
              <SimulationPassed />
            ) : simulationState === SimulationState.someFailed ? (
              <SimulationFailed />
            ) : (
              <ChainNotSupported />
            )}
          </Flex>
          <Flex direction="row">
            <Muted>{t('poweredBy')}</Muted> <TenderlyLogo src={tenderlyLogo} />
          </Flex>
        </StatusWrapper>
        <Button disabled={false} fullWidth onClick={() => console.log('click')}>
          {t('dismiss')}
        </Button>
      </Flex>
    </Modal>
  );
};

export default SimulationModal;

const SimulationPending = () => {
  const { t } = useTranslation();

  return (
    <>
      <PendingCircle height="86px" width="86px" />
      <Message>{t('simulations.verifyingActions')}</Message>
    </>
  );
};

const SimulationPassed = () => {
  const { t } = useTranslation();
  return (
    <>
      <SuccessCircle>
        <FiCheck size={40} />
      </SuccessCircle>
      <Message>{t('simulations.actionsVerified')}</Message>
    </>
  );
};

const SimulationFailed = () => {
  const { t } = useTranslation();
  return (
    <>
      <WarningCircle>
        <FiX size={40} />
      </WarningCircle>
      <Message>{t('simulations.actionsFailed')}</Message>
    </>
  );
};

const ChainNotSupported = () => {
  const { t } = useTranslation();
  return (
    <>
      <Circle>
        <FiX size={40} />
      </Circle>
      <Message>{t('simulations.chainNotSupported')}</Message>
    </>
  );
};
