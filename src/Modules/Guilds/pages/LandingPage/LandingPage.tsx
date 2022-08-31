import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGuildRegistry } from 'hooks/Guilds/ether-swr/guild/useGuildRegistry';
import { GuildCard } from 'components/GuildCard/GuildCard';

import useGuildMemberTotal from 'hooks/Guilds/ether-swr/guild/useGuildMemberTotal';
import useActiveProposalsNow from 'hooks/Guilds/ether-swr/guild/useGuildActiveProposals';
import useENSNameFromAddress from 'hooks/Guilds/ens/useENSNameFromAddress';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';

import { CardsContainer } from './LandingPage.styled';

const GuildCardLoader = () => {
  return (
    <GuildCard
      isLoading={true}
      guildAddress={null}
      numberOfMembers={null}
      t={null}
      numberOfActiveProposals={null}
      ensName={null}
      data={null}
    />
  );
};

const GuildCardWithContent = ({ guildAddress, t }) => {
  const { data: numberOfMembers } = useGuildMemberTotal(guildAddress);
  const { data: numberOfActiveProposals } = useActiveProposalsNow(guildAddress);
  const ensName = useENSNameFromAddress(guildAddress)?.ensName?.split('.')[0];
  const { data } = useGuildConfig(guildAddress);

  return (
    <GuildCard
      guildAddress={guildAddress}
      numberOfMembers={numberOfMembers}
      t={t}
      numberOfActiveProposals={numberOfActiveProposals}
      ensName={ensName}
      data={data}
    />
  );
};

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: allGuilds, error, isValidating } = useGuildRegistry();

  const EmptyGuilds = () => {
    return <h1>{t('noGuildsRegistered')}</h1>;
  };

  if (!allGuilds || allGuilds.length === 0) {
    return <EmptyGuilds />;
  }

  if (isValidating) {
    return (
      <CardsContainer>
        <GuildCardLoader />
        <GuildCardLoader />
        <GuildCardLoader />
      </CardsContainer>
    );
  }

  return (
    <>
      <CardsContainer>
        {error ? (
          <>{/* Render error state */}</>
        ) : (
          allGuilds.map(guildAddress => (
            <GuildCardWithContent
              key={guildAddress}
              guildAddress={guildAddress}
              t={t}
            />
          ))
        )}
      </CardsContainer>
    </>
  );
};

export default LandingPage;
