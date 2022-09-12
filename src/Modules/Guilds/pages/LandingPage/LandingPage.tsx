import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGuildRegistry } from 'Modules/Guilds/Hooks/useGuildRegistry';
import { GuildCard } from 'components/GuildCard/GuildCard';

import useGuildMemberTotal from 'Modules/Guilds/Hooks/useGuildMemberTotal';
import useActiveProposalsNow from 'Modules/Guilds/Hooks/useGuildActiveProposals';
import useENSNameFromAddress from 'hooks/Guilds/ens/useENSNameFromAddress';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';

import { CardsContainer } from './LandingPage.styled';
import useGuildHolderTotal from 'Modules/Guilds/Hooks/useGuildHolderTotal';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';

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
  const { data: guildConfig } = useGuildConfig(guildAddress);
  const { isRepGuild } = useGuildImplementationType(guildAddress);
  const { data: numberOfMembers } = useGuildMemberTotal(guildAddress);
  const { data: numberOfHolders } = useGuildHolderTotal(guildConfig?.token);
  const { data: numberOfActiveProposals } = useActiveProposalsNow(guildAddress);
  const ensName = useENSNameFromAddress(guildAddress)?.ensName?.split('.')[0];
  const { data } = useGuildConfig(guildAddress);

  const participants = isRepGuild ? numberOfHolders : numberOfMembers;

  return (
    <GuildCard
      guildAddress={guildAddress}
      numberOfMembers={participants}
      t={t}
      numberOfActiveProposals={numberOfActiveProposals}
      ensName={ensName}
      data={data}
    />
  );
};

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: allGuilds, error, isLoading } = useGuildRegistry();

  const EmptyGuilds = () => {
    return <h1>{t('noGuildsRegistered')}</h1>;
  };

  if (!allGuilds || allGuilds.length === 0) {
    return <EmptyGuilds />;
  }

  if (isLoading) {
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
