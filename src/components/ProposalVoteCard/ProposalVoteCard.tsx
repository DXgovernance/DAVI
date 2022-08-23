import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import VotesChart from './components/VoteChart/VoteChart';
import { VoteConfirmationModal } from './components/VoteConfirmationModal';
import VoteResults from './components/VoteResults/VoteResults';
import { BigNumber } from 'ethers';
import moment from 'moment';
import { Loading } from 'components/Primitives/Loading';
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
import { useTranslation } from 'react-i18next';
import { getOptionLabel } from 'components/ProposalVoteCard/utils';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';

const ProposalVoteCard = ({
  voteData,
  proposal,
  votingPower,
  timestamp,
  contract,
  createTransaction,
}: ProposalVoteCardProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isPercent, setIsPercent] = useState(true);
  const [selectedAction, setSelectedAction] = useState<BigNumber>();
  const [modalOpen, setModalOpen] = useState<boolean>();
  const isOpen = useMemo(
    () => proposal?.endTime?.isAfter(moment(timestamp)),
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
    votingPowerAtProposalSnapshot: votingPower?.atSnapshot,
    votingPowerAtProposalCurrentSnapshot: votingPower?.atCurrentSnapshot,
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
            t('castVote')
          ) : (
            t('voteResults')
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
          <VoteResults
            isPercent={isPercent}
            voteData={voteData}
            proposalMetadata={proposal?.metadata}
          />
          <VotesChart isPercent={isPercent} voteData={voteData} />
        </VotesContainer>

        {isOpen && voteData?.options && (
          <ButtonsContainer>
            <VoteOptionsLabel>{t('options')}</VoteOptionsLabel>

            {/* Getting the full option keys list but displaying default 0 index option at the bottom */}
            {[...Object.keys(voteData?.options).slice(1), '0'].map(
              optionKey => {
                const bItem = BigNumber.from(optionKey);
                const label = getOptionLabel({
                  metadata: proposal?.metadata,
                  optionKey: optionKey,
                  t,
                });

                return (
                  <VoteOptionButton
                    key={optionKey}
                    variant="secondary"
                    active={selectedAction && selectedAction.eq(bItem)}
                    onClick={() => {
                      setSelectedAction(
                        selectedAction && selectedAction.eq(bItem)
                          ? null
                          : bItem
                      );
                    }}
                  >
                    {label}
                  </VoteOptionButton>
                );
              }
            )}

            <VoteActionButton
              disabled={!selectedAction}
              onClick={() =>
                handleVoteOnProposal({
                  hasNoVotingPower,
                  hasVotingPowerAtCurrentSnapshot,
                })
              }
            >
              {t('vote')}
            </VoteActionButton>
          </ButtonsContainer>
        )}
      </SidebarCardContent>

      <VoteConfirmationModal
        isOpen={modalOpen}
        onDismiss={() => setModalOpen(false)}
        onConfirm={() => {
          confirmVoteProposal({
            proposal,
            contract,
            selectedAction,
            userVotingPower: votingPower.userVotingPower,
            createTransaction,
          });
          setModalOpen(false);
          setSelectedAction(null);
        }}
        selectedAction={getOptionLabel({
          metadata: proposal?.metadata,
          optionKey: selectedAction?.toNumber(),
          t,
        })}
        votingPower={votingPower?.percent}
        currentVoteAmount={useVotingPowerPercent(
          voteData?.options?.[selectedAction?.toNumber()],
          voteData?.totalLocked
        )}
      />
    </SidebarCard>
  );
};

export default ProposalVoteCard;
