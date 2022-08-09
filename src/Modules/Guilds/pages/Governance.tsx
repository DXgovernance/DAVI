/* eslint-disable react-hooks/exhaustive-deps */
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
import useActiveProposalsNow from 'hooks/Guilds/ether-swr/guild/useGuildActiveProposals';
import { useTypedParams } from '../Hooks/useTypedParams';
import { Link } from 'react-router-dom';

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

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
`;

const Governance = ({ guildId }) => {
  const { isLoading } = useContext(GuildAvailabilityContext);
  const { data: proposalIds, error } = useGuildProposalIds(guildId);
  const { t } = useTranslation();
  const { data: activeProposals } = useActiveProposalsNow(guildId);
  const { chainName } = useTypedParams();

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
    isStateSelected,
  } = useFilter();

  // Reset filters when page loads
  useEffect(() => {
    setSearchQuery('');
    onResetActionType();
    onResetCurrency();
    onResetState();
  }, []);

  // Show only 'Active' and 'Executable' proposals
  useEffect(() => {
    if (!isStateSelected('Active')) onToggleState('Active');
    if (!isStateSelected('Executable')) onToggleState('Executable');
  }, [onToggleState]);

  const revertedProposals = useMemo(() => {
    if (!proposalIds) return null;
    // clone array as the original proposalIds array from Ethers is immutable
    const clone = [...proposalIds];
    // Show latest proposals first
    return clone.reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        {activeProposals && activeProposals._hex === '0x00' && (
          <div>
            There are no active proposals.{' '}
            <StyledLink to={`/${chainName}/${guildId}/allproposals`}>
              Go to all proposals page.
            </StyledLink>
          </div>
        )}

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
