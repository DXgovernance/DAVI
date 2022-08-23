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
import { Modal } from 'components/Primitives/Modal';
import React from 'react';
import { VoteConfirmationModalProps } from '../../types';
import { useTranslation } from 'react-i18next';

const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  selectedAction,
  votingPower,
  currentVoteAmount,
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
            <InfoLabel>{t('option', { optionKey: '' })}</InfoLabel>
            <InfoValue>{selectedAction}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('votingPower')}</InfoLabel>
            <InfoValue>{votingPower}%</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{t('voteImpact')}</InfoLabel>
            <InfoValue>
              <InfoValue grey> {currentVoteAmount}% </InfoValue>
              {`-->  ${votingPower + currentVoteAmount}%`}
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
