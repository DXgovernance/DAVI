import { Flex } from 'Components/Primitives/Layout';
import { Modal } from 'Components/Primitives/Modal';
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
import { SimulationState } from './OptionsList';

interface SimulationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  status: SimulationState;
}

const SimulationModal: React.FC<SimulationModalProps> = ({
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
          <Flex>
            {status === SimulationState.pending ? (
              <SimulationPending />
            ) : status === SimulationState.allPassed ? (
              <SimulationPassed />
            ) : status === SimulationState.someFailed ? (
              <SimulationFailed />
            ) : (
              <ChainNotSupported />
            )}
          </Flex>
          <Flex direction="row">
            <Muted>{t('poweredBy')}</Muted> <TenderlyLogo src={tenderlyLogo} />
          </Flex>
        </StatusWrapper>
        <Button disabled={false} fullWidth onClick={onDismiss}>
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
      <WarningCircle>
        <FiX size={40} />
      </WarningCircle>
      <Message>{t('simulations.chainNotSupported')}</Message>
    </>
  );
};
