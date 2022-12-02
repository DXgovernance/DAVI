import useProposal from 'Modules/Guilds/Hooks/useProposal';
import AddressButton from 'components/AddressButton/AddressButton';
import { ProposalDescription } from 'components/ProposalDescription';
import { ProposalInfoCard } from 'components/ProposalInfoCard';
import { ProposalStatus } from 'components/ProposalStatus';
import { IconButton } from 'components/primitives/Button';
import { UnstyledLink } from 'components/primitives/Links';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useGuildProposalIds } from 'Modules/Guilds/Hooks/useGuildProposalIds';
import useTotalLocked from 'Modules/Guilds/Hooks/useTotalLocked';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import { Loading } from 'components/primitives/Loading';
import { Result, ResultState } from 'components/Result';
import React, { useContext } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import ProposalVoteCardWrapper from 'Modules/Guilds/Wrappers/ProposalVoteCardWrapper';
import { useProposalState } from 'hooks/Guilds/useProposalState';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import {
  HeaderTopRow,
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
  DiscussionWrapper,
  SidebarContent,
  StyledIconButton,
} from './Discussion.styled';
import { useTranslation } from 'react-i18next';
import useTimeDetail from 'Modules/Guilds/Hooks/useTimeDetail';
import useGuildImplementationTypeConfig from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { Discussion } from 'components/Discussion';

const DiscussionPage: React.FC = () => {
  const { t } = useTranslation();
  const { chainName, guildId, proposalId } = useTypedParams();

  const context =
    process.env.NODE_ENV === 'development'
      ? 'kjzl6cwe1jw145gun3sei0a4puw586yxa614le1tfh434y7quv2wsm0ivhbge7x'
      : guildId;

  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );
  const { data: proposalIds } = useGuildProposalIds(guildId);
  const { data: proposal, error } = useProposal(guildId, proposalId);
  const { data: guildConfig } = useGuildConfig(guildId);
  const { loaded } = useGuildImplementationTypeConfig(guildId);

  const { data: metadata, error: metadataError } = useProposalMetadata(
    guildId,
    proposalId
  );

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildId,
    proposalId,
  });

  const { data: totalLocked } = useTotalLocked(guildId, snapshotId?.toString());

  const quorum = useVotingPowerPercent(
    guildConfig?.votingPowerForProposalExecution,
    totalLocked
  );

  const status = useProposalState(proposal);
  const endTime = useTimeDetail(guildId, status, proposal?.endTime);

  if (!loaded) {
    return <></>;
  } else {
    if (!isGuildAvailabilityLoading) {
      if (!proposalIds?.includes(proposalId)) {
        return (
          <Result
            state={ResultState.ERROR}
            title="We couldn't find that proposal."
            subtitle="It probably doesn't exist."
            extra={
              <UnstyledLink to={`/${chainName}/${guildId}`}>
                <IconButton iconLeft>
                  <FiArrowLeft /> See all proposals
                </IconButton>
              </UnstyledLink>
            }
          />
        );
      } else if (error) {
        return (
          <Result
            state={ResultState.ERROR}
            title={t('errorMessage.genericProposalError')}
            subtitle={error.message}
          />
        );
      }
    }

    return (
      <PageContainer>
        <PageContent>
          <PageHeader>
            <HeaderTopRow>
              <UnstyledLink to={`/${chainName}/${guildId}`}>
                <StyledIconButton variant="secondary" iconLeft>
                  <FaChevronLeft style={{ marginRight: '15px' }} />{' '}
                  {guildConfig?.name}
                </StyledIconButton>
              </UnstyledLink>

              <ProposalStatus status={status} endTime={endTime} />
            </HeaderTopRow>
            <PageTitle>
              {proposal?.title || (
                <Loading loading text skeletonProps={{ width: '800px' }} />
              )}
            </PageTitle>
          </PageHeader>

          <AddressButton address={proposal?.creator} />

          <ProposalDescription metadata={metadata} error={metadataError} />

          <ProposalVoteCardWrapper />

          <DiscussionWrapper>
            <Discussion context={context} master={''} />
          </DiscussionWrapper>
        </PageContent>
        <SidebarContent>
          <ProposalInfoCard
            proposal={proposal}
            guildConfig={guildConfig}
            quorum={quorum}
          />
        </SidebarContent>
      </PageContainer>
    );
  }
};

export default DiscussionPage;
