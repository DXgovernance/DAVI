import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useContext, useEffect, useMemo } from 'react';
import Result, { ResultState } from 'old-components/Guilds/common/Result';
import { Box } from 'Components/Primitives/Layout';
import styled from 'styled-components';
import ProposalCardWrapper from '../Wrappers/ProposalCardWrapper';
import { useGuildProposalIds } from 'hooks/Guilds/ether-swr/guild/useGuildProposalIds';
import { useFilter } from 'contexts/Guilds';
import { Heading } from 'old-components/Guilds/common/Typography';
import Input from 'old-components/Guilds/common/Form/Input';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const ProposalsList = styled(Box)`
  margin-top: 1rem;
`;

const ProposalListWrapper = styled.div`
  height: 50vh;
  @media only screen and (min-width: 768px) {
    height: 75vh;
  }
`;

const StyledHeading = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 20px;
`;

const Governance = ({ guildId }) => {
  const { isLoading } = useContext(GuildAvailabilityContext);
  const { data: proposalIds, error } = useGuildProposalIds(guildId);
  const { t } = useTranslation();

  /*
  Since filters are a global state, we need to reset all of them
  who were set in the "All proposals" view. If we don't do this,
  filters applied in that view will impact here
  */

  const {
    onResetState,
    onResetActionType,
    onResetCurrency,
    onToggleState,
    searchQuery,
    setSearchQuery,
  } = useFilter();
  // Reset filters when page loads
  useEffect(() => {
    setSearchQuery('');
    onResetActionType();
    onResetCurrency();
    onResetState();
    onToggleState('Active');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const revertedProposals = useMemo(() => {
    if (!proposalIds) return null;
    // clone array as the original proposalIds array from Ethers is immutable
    const clone = [...proposalIds];
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

  return (
    <>
      <Input
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value);
        }}
        icon={<AiOutlineSearch size={24} />}
        placeholder={t('searchTitleEnsAddress')}
      />
      <ProposalsList data-testid="proposals-list">
        <StyledHeading size={2}>{t('proposals')}</StyledHeading>

        {proposalIds ? (
          <ProposalListWrapper>
            {revertedProposals.map(proposal => (
              <ProposalCardWrapper proposalId={proposal} />
            ))}
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

export default Governance;
