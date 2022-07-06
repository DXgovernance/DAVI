import { useGuildProposalIds } from 'hooks/Guilds/ether-swr/guild/useGuildProposalIds';
import { Filter } from 'Components/Filter';
import { Box } from 'Components/Primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import ProposalCardWrapper from 'Modules/Guilds/Wrappers/ProposalCardWrapper';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import Result, { ResultState } from 'old-components/Guilds/common/Result';
import React, { useContext, useMemo, useState } from 'react';
import InView from 'react-intersection-observer';
import styled from 'styled-components';
import GuildSidebarWrapper from 'Modules/Guilds/Wrappers/GuildSidebarWrapper';
import { useFilter } from 'contexts/Guilds/filters';

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

const GuildsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { guildId } = useTypedParams();
  const { data: proposalIds, error } = useGuildProposalIds(guildId);
  const { isLoading } = useContext(GuildAvailabilityContext);
  const {
    matchTitle,
    matchCreatorAddress,
    matchRecipientAddresses,
    filterState,
    countStateSelected,
    countActionTypeSelected,
    filterActionTypes,
    countCurrencySelected,
    filterCurrency,
  } = useFilter();

  const filteredProposalIds = useMemo(() => {
    if (!proposalIds) return null;

    // clone array as the original proposalIds array from Ethers is immutable
    const clone = [...proposalIds];

    // TODO: Implement filtering

    // Show latest proposals first
    return clone.reverse();
  }, [proposalIds]);

  if (!isLoading && !proposalIds && error) {
    return (
      <Result
        state={ResultState.ERROR}
        title="We ran into an error."
        subtitle={error.message}
      />
    );
  }

  const match = (proposal, proposalState, summaryActions) => {
    const matchState = countStateSelected
      ? filterState.includes(proposalState)
      : true;

    const matchActionType = countActionTypeSelected
      ? summaryActions?.some(action =>
          filterActionTypes.includes(action?.decodedCall?.callType)
        )
      : true;

    const matchCurrency = countCurrencySelected
      ? summaryActions.some(action =>
          filterCurrency.includes(action.decodedCall?.to)
        )
      : true;

    const matchSearch = searchQuery
      ? [matchTitle, matchCreatorAddress, matchRecipientAddresses].some(
          matcher => matcher(proposal, searchQuery)
        )
      : true;

    return matchState && matchActionType && matchCurrency && matchSearch;
  };

  return (
    <PageContainer>
      <SidebarContent>
        <GuildSidebarWrapper />
      </SidebarContent>
      <PageContent>
        <Filter onSearchChange={setSearchQuery} />
        <ProposalsList data-testid="proposals-list">
          {filteredProposalIds ? (
            filteredProposalIds.map(proposalId => (
              <InView key={proposalId}>
                {({ inView, ref }) => (
                  <div ref={ref}>
                    <ProposalCardWrapper
                      proposalId={inView ? proposalId : null}
                      match={match}
                    />
                  </div>
                )}
              </InView>
            ))
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
