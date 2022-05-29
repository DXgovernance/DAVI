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
const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  onConfirm,
  selectedAction,
  votingPower,
  totalLocked,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      header="Confirm Vote"
      leftIcon={false}
      maxWidth={380}
    >
      <Container>
        <Title>Are you sure you want to vote "{selectedAction}"?</Title>
        <InfoItem>This action cannot be reverted</InfoItem>

        <Widget>
          <InfoRow>
            <InfoLabel>Option</InfoLabel>
            <InfoValue>{selectedAction}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Voting Power</InfoLabel>
            <InfoValue>{votingPower}%</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Vote Impact</InfoLabel>
            <InfoValue>
              <InfoValue grey> {totalLocked}% </InfoValue>
              {' -> '} {votingPower + totalLocked}%
            </InfoValue>
          </InfoRow>
        </Widget>
        <ActionWrapper>
          <CancelButton onClick={onDismiss}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Vote</ConfirmButton>
        </ActionWrapper>
      </Container>
    </Modal>
  );
};

export default VoteConfirmationModal;
