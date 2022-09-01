/* eslint-disable react-hooks/exhaustive-deps */
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useContext, useEffect, useMemo } from 'react';
import { Result, ResultState } from 'components/Result';
import { Flex } from 'components/primitives/Layout';
import ProposalCardWrapper from '../../Wrappers/ProposalCardWrapper';
import { useGuildProposalIds } from 'hooks/Guilds/ether-swr/guild/useGuildProposalIds';
import { useFilter } from 'contexts/Guilds';
import { Input } from 'components/primitives/Forms/Input';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import useActiveProposalsNow from 'hooks/Guilds/ether-swr/guild/useGuildActiveProposals';
import { useTypedParams } from '../../Hooks/useTypedParams';
import { UnstyledLink } from 'components/primitives/Links';
import { Button } from 'components/primitives/Button';
import {
  ProposalsList,
  StyledButton,
  StyledHeading,
  StyledLink,
} from './Governance.styled';
import { ProposalState } from 'types/types.guilds.d';
import Discussions from 'Modules/Social/Discussions';
import useIsProposalCreationAllowed from 'hooks/Guilds/useIsProposalCreationAllowed';

const Governance = ({ guildId }) => {
  const { isLoading } = useContext(GuildAvailabilityContext);
  const { data: proposalIds, error } = useGuildProposalIds(guildId);
  const { t } = useTranslation();
  const { data: activeProposals } = useActiveProposalsNow(guildId);
  const { chainName } = useTypedParams();
  const isProposalCreationAllowed = useIsProposalCreationAllowed();

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
    if (!isStateSelected(ProposalState.Active))
      onToggleState(ProposalState.Active);
    if (!isStateSelected(ProposalState.Executable))
      onToggleState(ProposalState.Executable);
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
        title={t('genericProposalError')}
        subtitle={error.message}
      />
    );
  }

  return (
    <>
      <Flex direction="row">
        <Input
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
          icon={<AiOutlineSearch size={24} />}
          placeholder={t('searchTitleEnsAddress')}
        />
        {isProposalCreationAllowed && (
          <>
            <UnstyledLink to={`/${chainName}/${guildId}/create-proposal`}>
              <StyledButton
                variant="secondary"
                data-testid="create-proposal-button"
              >
                {t('createProposal')}
              </StyledButton>
            </UnstyledLink>
            /
            <UnstyledLink to={`/${chainName}/${guildId}/create`}>
              <Button
                variant="secondary"
                data-testid="create-discussion-button"
              >
                {t('forum.createDiscussion')}
              </Button>
            </UnstyledLink>
          </>
        )}
      </Flex>
      <ProposalsList data-testid="proposals-list">
        <StyledHeading size={2}>{t('proposals')}</StyledHeading>

        {activeProposals && activeProposals._hex === '0x00' && (
          <div>
            {t('noActiveProposalsMessage')}.{' '}
            <StyledLink to={`/${chainName}/${guildId}/all-proposals`}>
              {t('goToAllProposalsPage')}.
            </StyledLink>
          </div>
        )}

        {proposalIds ? (
          <>
            {revertedProposals.map(proposal => (
              <ProposalCardWrapper key={proposal} proposalId={proposal} />
            ))}
          </>
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
      <ProposalsList>
        <StyledHeading size={2}>{t('forum.discussions_other')}</StyledHeading>
        <Discussions />
      </ProposalsList>
    </>
  );
};

export default Governance;
