// import { useState } from 'react';
import { Button } from 'components/primitives/Button';
import { Modal } from 'components/primitives/Modal';
import { Vote as VoteInterface } from 'contexts/Guilds/voteCart';
import { Vote } from './Vote';
import {
  ModalWrapper,
  VoteCount,
  ButtonsWrapper,
} from './MultiVoteModal.styled';

interface MultiVoteModalProps {
  isModalOpen: boolean;
  setModalOpen: (v: boolean) => void;
  votes: VoteInterface[];
  confirmVote: () => void;
  setVotes: (v: any) => void;
  removeVote: (v: VoteInterface) => void;
}

export const MultiVoteModal = ({
  isModalOpen,
  setModalOpen,
  votes,
  confirmVote,
  setVotes,
  removeVote,
}: MultiVoteModalProps) => {
  //   const [selectedVotes, setSelectedVotes] = useState<VoteInterface[]>([]);
  //   const isSelected = (v: VoteInterface) =>
  //     selectedVotes.some(
  //       vote =>
  //         vote.proposal.id === v.proposal.id &&
  //         vote.optionLabel === v.optionLabel &&
  //         vote.voter === v.voter
  //     );
  //   const toggle = (vote: VoteInterface) => {
  //     if (isSelected(vote)) {
  //       const newVotes = selectedVotes.filter(v => {
  //         return (
  //           v.proposal.id !== vote.proposal.id &&
  //           v.optionLabel !== vote.optionLabel &&
  //           v.voter !== vote.voter
  //         );
  //       });
  //       setSelectedVotes(newVotes);
  //     }
  //     setSelectedVotes(v => [...v, vote]);
  //   };

  return (
    <Modal
      isOpen={isModalOpen}
      onDismiss={() => setModalOpen(false)}
      header="MultiVote"
      cross
      maxWidth={300}
    >
      <ModalWrapper>
        {!votes.length ? (
          <div>No votes added to the cart. Start voting</div>
        ) : (
          <VoteCount>
            {votes.length} Vote{votes.length > 1 ? 's' : ''}
          </VoteCount>
        )}
        {votes.length > 0 &&
          votes?.map(vote => {
            // const selected = isSelected(vote);
            return (
              <Vote
                removeVote={() => removeVote(vote)}
                selected={false}
                toggle={() => {}}
                vote={vote}
              />
            );
          })}
        {votes.length > 0 && (
          <ButtonsWrapper>
            <Button variant="primary" onClick={confirmVote}>
              Vote On-Chain
            </Button>
            <Button variant="secondary" onClick={confirmVote}>
              Vote Off-Chain
            </Button>
          </ButtonsWrapper>
        )}
      </ModalWrapper>
    </Modal>
  );
};

