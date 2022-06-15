import {
  Container,
  Title,
  InfoItem,
  ActionWrapper,
  CancelButton,
  ConfirmButton,
  TextContainer,
} from './ConfirmRemoveActionModal.styled';
import { Modal } from 'old-components/Guilds/common/Modal';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmRemoveActionModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}
const ConfirmRemoveActionModal: React.FC<ConfirmRemoveActionModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      header={t('confirmRemoval')}
      leftIcon={false}
      maxWidth={380}
    >
      <Container>
        <TextContainer>
          <Title>{t('areYuoSureYouWantToRemoveAction')}</Title>
          <InfoItem>{t('theRemovalCannotBeReverted')}</InfoItem>
        </TextContainer>

        <ActionWrapper>
          <CancelButton onClick={onDismiss}>{t('cancel')}</CancelButton>
          <ConfirmButton onClick={onConfirm}>{t('removeAction')}</ConfirmButton>
        </ActionWrapper>
      </Container>
    </Modal>
  );
};

export default ConfirmRemoveActionModal;
