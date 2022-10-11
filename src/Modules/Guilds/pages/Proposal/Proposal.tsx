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
import useProposalCalls from 'Modules/Guilds/Hooks/useProposalCalls';
import { Loading } from 'components/primitives/Loading';
import { Result, ResultState } from 'components/Result';
import React, { useContext, useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import ProposalVoteCardWrapper from 'Modules/Guilds/Wrappers/ProposalVoteCardWrapper';
import { ExecuteButton } from 'components/ExecuteButton';
import { useProposalState } from 'hooks/Guilds/useProposalState';
import useExecutable from 'hooks/Guilds/useExecutable';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { ProposalState } from 'types/types.guilds.d';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { ActionsBuilder } from 'components/ActionsBuilder';
import { useAccount } from 'wagmi';
import { isReadOnly } from 'provider/wallets';
import {
  HeaderTopRow,
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
  ProposalActionsWrapper,
  SidebarContent,
  StyledIconButton,
} from './Proposal.styled';
import { useTranslation } from 'react-i18next';
import useTimeDetail from 'Modules/Guilds/Hooks/useTimeDetail';
import { OrbisContext } from 'contexts/Guilds/orbis';

const ProposalPage: React.FC = () => {
  const { t } = useTranslation();
  const { connector } = useAccount();
  const { chainName, guildId, proposalId } = useTypedParams();

  const [allData, setallData] = useState(null);

  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );
  const { data: proposalIds } = useGuildProposalIds(guildId);
  const { data: proposal, error } = useProposal(guildId, proposalId);
  const { options } = useProposalCalls(guildId, proposalId);
  const { data: guildConfig } = useGuildConfig(guildId);

  const { data: metadata, error: metadataError } = useProposalMetadata(
    guildId,
    proposalId
  );

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildId,
    proposalId,
  });

  const { data: totalLocked } = useTotalLocked(guildId, snapshotId?.toString());

  const { orbis } = useContext(OrbisContext);

  const quorum = useVotingPowerPercent(
    guildConfig?.votingPowerForProposalExecution,
    totalLocked
  );

  const status = useProposalState(proposal);
  const endTime = useTimeDetail(guildId, status, proposal?.endTime);

  const {
    data: { executeProposal },
  } = useExecutable();

  const getDiscussions = async (page: number = 0) => {
    let { data } = await orbis.getPosts(
      {
        algorithm: 'all-context-master-posts',
        context: `signed-votes-${proposalId}`,
      },
      page
    );
    console.log(data);
    setallData(data);
  };

  useEffect(() => {
    getDiscussions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(allData);
  }, [allData]);

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
            {status === ProposalState.Executable && !isReadOnly(connector) && (
              <ExecuteButton executeProposal={executeProposal} />
            )}
          </HeaderTopRow>
          <PageTitle>
            {proposal?.title || (
              <Loading loading text skeletonProps={{ width: '800px' }} />
            )}
          </PageTitle>
        </PageHeader>

        <AddressButton address={proposal?.creator} />

        <ProposalDescription metadata={metadata} error={metadataError} />

        <ProposalActionsWrapper>
          <ActionsBuilder options={options} editable={false} />
        </ProposalActionsWrapper>
      </PageContent>
      <SidebarContent>
        <ProposalVoteCardWrapper offChainVotes={allData} />
        <ProposalInfoCard
          proposal={proposal}
          guildConfig={guildConfig}
          quorum={quorum}
        />
      </SidebarContent>
    </PageContainer>
  );
};

export default ProposalPage;
