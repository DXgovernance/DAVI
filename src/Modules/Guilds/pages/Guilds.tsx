import { useGuildProposalIds } from 'hooks/Guilds/ether-swr/guild/useGuildProposalIds';
import { Filter } from 'Components/Filter';
import { Box } from 'Components/Primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import ProposalCardWrapper from 'Modules/Guilds/Wrappers/ProposalCardWrapper';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import Result, { ResultState } from 'old-components/Guilds/common/Result';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import GuildSidebarWrapper from 'Modules/Guilds/Wrappers/GuildSidebarWrapper';
import { Virtuoso } from 'react-virtuoso';

const PageContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    grid-template-columns: 300px minmax(0, 1fr);
  }
`;

const SidebarContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-right: 0.5rem;
  }
`;

const PageContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const ProposalsList = styled(Box)`
  margin-top: 1rem;
`;

const ProposalListWrapper = styled.div`
  height: 50vh;
  @media only screen and (min-width: 768px) {
    height: 75vh;
  }
`;

const GuildsPage: React.FC = () => {
  const { guildId } = useTypedParams();
  const { data: proposalIds, error } = useGuildProposalIds(guildId);
  const { isLoading } = useContext(GuildAvailabilityContext);

  const filteredProposalIds = useMemo(() => {
    // TODO: Implement filtering
    if (!proposalIds) return null;

    // clone array as the original proposalIds array from Ethers is immutable
    const clone = [...proposalIds];

    // Show latest proposals first
    return clone.reverse();
  }, [proposalIds]);

  const PROPOSALS_TO_LOAD = 10;
  const [numberOfProposalsToShow, setNumberOfProposalsToShow] =
    useState(PROPOSALS_TO_LOAD);

  const shownProposals = useMemo(() => {
    if (!filteredProposalIds) return null;
    return filteredProposalIds.slice(0, numberOfProposalsToShow);
  }, [filteredProposalIds, numberOfProposalsToShow]);

  const loadMoreProposals = () => {
    setNumberOfProposalsToShow(numberOfProposalsToShow + PROPOSALS_TO_LOAD);
  };

  if (!isLoading && !proposalIds && error) {
    return (
      <Result
        state={ResultState.ERROR}
        title="We ran into an error."
        subtitle={error.message}
      />
    );
  }

  return (
    <PageContainer>
      <SidebarContent>
        <GuildSidebarWrapper />
      </SidebarContent>
      <PageContent>
        <Filter />

        <ProposalsList data-testid="proposals-list">
          {filteredProposalIds ? (
            <ProposalListWrapper>
              <Virtuoso
                style={{ height: '100%' }}
                data={shownProposals}
                totalCount={shownProposals.length}
                itemContent={index => (
                  <ProposalCardWrapper proposalId={shownProposals[index]} />
                )}
                endReached={loadMoreProposals}
              />
            </ProposalListWrapper>
          ) : (
            <>
              <ProposalCardWrapper />
              <ProposalCardWrapper />
              <ProposalCardWrapper />
              <ProposalCardWrapper />
              <ProposalCardWrapper />
            </>
          )}
        </ProposalsList>
      </PageContent>
    </PageContainer>
  );
};

export default GuildsPage;
