import {
  Container,
  Title,
  InfoItem,
  Widget,
  InfoRow,
  InfoLabel,
  InfoValue,
  ActionWrapper,
  CancelButton,
  ConfirmButton,
} from './VoteConfirmationModal.styled';
import { Modal } from 'old-components/Guilds/common/Modal';
import React from 'react';
import { VoteConfirmationModalProps } from '../../types';
import { useTranslation } from 'react-i18next';

const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  selectedAction,
  votingPower,
  totalLocked,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      header="Confirm Vote"
      leftIcon={false}
      maxWidth={380}
    >
      <Container>
        <Title>{t('voteQuestion', { action: selectedAction })}</Title>
        <InfoItem>{t('noRevertAction')}</InfoItem>

        <Widget>
          <InfoRow>
            <InfoLabel>{t('option')}</InfoLabel>
            <InfoValue>{selectedAction}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('votingPower')}</InfoLabel>
            <InfoValue>{votingPower}%</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('voteImpact')}</InfoLabel>
            <InfoValue>
              <InfoValue grey> {totalLocked}% </InfoValue>
              {`-->  ${votingPower + totalLocked}%`}
            </InfoValue>
          </InfoRow>
        </Widget>
        <ActionWrapper>
          <CancelButton onClick={onDismiss}>{t('cancel')}</CancelButton>
          <ConfirmButton onClick={onConfirm}>{t('vote')}</ConfirmButton>
        </ActionWrapper>
      </Container>
    </Modal>
  );
};

export default VoteConfirmationModal;
