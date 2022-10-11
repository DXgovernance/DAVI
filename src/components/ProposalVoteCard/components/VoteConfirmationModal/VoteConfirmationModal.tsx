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
import { Button } from 'components/primitives/Button';
import { Modal } from 'components/primitives/Modal';
import React from 'react';
import { VoteConfirmationModalProps } from '../../types';
import { useTranslation } from 'react-i18next';

import { AiOutlineInfoCircle } from 'react-icons/ai';

const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  selectedOption,
  votingPower,
  currentVoteAmount,
  onAddToVoteCart,
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
        <Title>{t('voteQuestion', { action: selectedOption })}</Title>
        <InfoItem>{t('noRevertAction')}</InfoItem>

        <Widget>
          <InfoRow>
            <InfoLabel>{t('option', { optionKey: '' })}</InfoLabel>
            <InfoValue>{selectedOption}</InfoValue>
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
          <ConfirmButton onClick={onConfirm}>{t('vote')} now</ConfirmButton>
        </ActionWrapper>
        <Button
          variant="tertiary"
          onClick={onAddToVoteCart}
          style={{ margin: '1rem 0' }}
          fullWidth
        >
          Add to MultiVote{' '}
          <AiOutlineInfoCircle size={14} style={{ marginLeft: 4 }} />
        </Button>
      </Container>
    </Modal>
  );
};

export default VoteConfirmationModal;
