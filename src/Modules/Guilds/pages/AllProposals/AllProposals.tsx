import { useGuildProposalIds } from 'hooks/Guilds/ether-swr/guild/useGuildProposalIds';
import { Filter } from 'Components/Filter';
import ProposalCardWrapper from 'Modules/Guilds/Wrappers/ProposalCardWrapper';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import Result, { ResultState } from 'old-components/Guilds/common/Result';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useFilter } from 'contexts/Guilds';
import { ProposalListWrapper, ProposalsList } from './AllProposals.styled';
import { useTranslation } from 'react-i18next';

const AllProposals = ({ guildId }) => {
  const { t } = useTranslation();
  const { isLoading } = useContext(GuildAvailabilityContext);
  const { data: proposalIds, error } = useGuildProposalIds(guildId);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  /*
  In "Governance" view, we reset all filters and apply one to show
  only "Active" proposals. Once we switch to "All proposals" view, 
  we reset the "Active" proposals filter. Also reset the "Action" and
  "Currency" filters to be consistant.
  */

  const { onResetState, onResetActionType, onResetCurrency, setSearchQuery } =
    useFilter();
  // Reset filters when page loads
  useEffect(() => {
    setSearchQuery('');
    onResetActionType();
    onResetCurrency();
    onResetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const revertedProposals = useMemo(() => {
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
    if (!revertedProposals) return null;
    return revertedProposals.slice(0, numberOfProposalsToShow);
  }, [revertedProposals, numberOfProposalsToShow]);

  const loadMoreProposals = (atBottom: boolean) => {
    if (atBottom && numberOfProposalsToShow < revertedProposals.length) {
      setNumberOfProposalsToShow(numberOfProposalsToShow + PROPOSALS_TO_LOAD);
    }
  };

  if (!isLoading && !proposalIds && error) {
    return (
      <Result
        state={ResultState.ERROR}
        title={t('genericProposalError')}
        subtitle={error.message}
      />
    );
  }

  return (
    <>
      <Filter
        openSearchBar={openSearchBar}
        setOpenSearchBar={setOpenSearchBar}
      />
      <ProposalsList data-testid="proposals-list">
        {revertedProposals ? (
          <ProposalListWrapper isSearchOpened={openSearchBar}>
            <Virtuoso
              style={{ height: '100%' }}
              data={shownProposals}
              totalCount={shownProposals.length}
              itemContent={index => (
                <ProposalCardWrapper proposalId={shownProposals[index]} />
              )}
              atBottomStateChange={loadMoreProposals}
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
    </>
  );
};

export default AllProposals;
