import SidebarCard, {
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'old-components/Guilds/SidebarCard';
import VotesChart from './components/VoteChart/VoteChart';
import { VoteConfirmationModal } from './components/VoteConfirmationModal';
import { VoteResults } from './components/VoteResults/VoteResults';
import { BigNumber } from 'ethers';
import moment from 'moment';
import { Loading } from 'Components/Primitives/Loading';
import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  SmallButton,
  VotesContainer,
  ButtonsContainer,
  VoteActionButton,
  VoteOptionButton,
  VoteOptionsLabel,
} from './ProposalVoteCard.styled';
import { voteOnProposal, confirmVoteProposal } from './utils';
import { useTheme } from 'styled-components';
import { hasVotingPowerProps, ProposalVoteCardProps } from './types';

const ProposalVoteCard = ({
  voteData,
  proposal,
  votingPower,
  timestamp,
  contract,
  currentLockedPercent,
  createTransaction,
}: ProposalVoteCardProps) => {
  const theme = useTheme();
  const [isPercent, setIsPercent] = useState(true);
  const [selectedAction, setSelectedAction] = useState<BigNumber>();
  const [modalOpen, setModalOpen] = useState<boolean>();
  const isOpen = useMemo(
    () => proposal?.endTime.isAfter(moment(timestamp)),
    [proposal, timestamp]
  );

  const toastError = (msg: string) =>
    toast.error(msg, {
      style: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.muted,
      },
      autoClose: 2800,
      hideProgressBar: true,
    });

  const { hasNoVotingPower, hasVotingPowerAtCurrentSnapshot } = voteOnProposal({
    votingPowerAtProposalSnapshot: votingPower.atProposal,
    votingPowerAtProposalCurrentSnapshot: votingPower.atCurrentSnapshot,
  });

  const handleVoteOnProposal = ({
    hasNoVotingPower,
    hasVotingPowerAtCurrentSnapshot,
  }: hasVotingPowerProps) => {
    if (hasNoVotingPower) {
      if (hasVotingPowerAtCurrentSnapshot) {
        return toastError(
          'Current voting power gained after proposal creation'
        );
      }
      return toastError('No Voting Power');
    }

    return setModalOpen(true);
  };

  return (
    <SidebarCard
      header={
        <SidebarCardHeaderSpaced>
          {!voteData ? (
            <Loading loading text />
          ) : isOpen ? (
            'Cast your vote'
          ) : (
            'Vote results'
          )}
          <SmallButton
            variant="secondary"
            onClick={() => setIsPercent(!isPercent)}
          >
            {!voteData ? (
              <Loading loading text skeletonProps={{ width: 40 }} />
            ) : isPercent ? (
              voteData?.token?.symbol
            ) : (
              '%'
            )}
          </SmallButton>
        </SidebarCardHeaderSpaced>
      }
    >
      <SidebarCardContent>
        <VotesContainer>
          <VoteResults isPercent={isPercent} />
          <VotesChart isPercent={isPercent} />
        </VotesContainer>

        {isOpen && voteData?.options && (
          <ButtonsContainer>
            <VoteOptionsLabel>Options</VoteOptionsLabel>

            {Object.keys(voteData?.options).map(optionKey => {
              const bItem = BigNumber.from(optionKey);

              return (
                <VoteOptionButton
                  variant="secondary"
                  active={selectedAction && selectedAction.eq(bItem)}
                  onClick={() => {
                    setSelectedAction(
                      selectedAction && selectedAction.eq(bItem) ? null : bItem
                    );
                  }}
                >
                  {proposal?.metadata?.voteOptions?.[optionKey] ||
                    'Option ' + (optionKey + 1)}
                </VoteOptionButton>
              );
            })}

            <VoteActionButton
              disabled={!selectedAction}
              onClick={() =>
                handleVoteOnProposal({
                  hasNoVotingPower,
                  hasVotingPowerAtCurrentSnapshot,
                })
              }
            >
              Vote
            </VoteActionButton>
          </ButtonsContainer>
        )}
      </SidebarCardContent>
      <VoteConfirmationModal
        isOpen={modalOpen}
        onDismiss={() => setModalOpen(false)}
        onConfirm={() =>
          confirmVoteProposal({
            proposal,
            contract,
            proposalId: proposal.id,
            selectedAction,
            userVotingPower: votingPower.atProposal,
            createTransaction,
          })
        }
        selectedAction={
          proposal?.metadata?.voteOptions?.[selectedAction?.toNumber()] ||
          selectedAction?.toString()
        }
        votingPower={votingPower?.percent}
        totalLocked={currentLockedPercent}
      />
    </SidebarCard>
  );
};

export default ProposalVoteCard;
