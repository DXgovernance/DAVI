import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { useGuildRegistry } from 'hooks/Guilds/ether-swr/guild/useGuildRegistry';
import GuildCard from 'Components/GuildCard/GuildCard';
import Input from 'old-components/Guilds/common/Form/Input';

import useGuildMemberTotal from 'hooks/Guilds/ether-swr/guild/useGuildMemberTotal';
import useActiveProposalsNow from 'hooks/Guilds/ether-swr/guild/useGuildActiveProposals';
import useENSNameFromAddress from 'hooks/Guilds/ether-swr/ens/useENSNameFromAddress';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import {
  CardsContainer,
  InputContainer,
  StyledButton,
  StyledLink,
} from './LandingPage.styled';

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
  const ensName = useENSNameFromAddress(guildAddress)?.split('.')[0];
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
  const { data: allGuilds, error } = useGuildRegistry();

  const isLoading = !allGuilds && !error;

  return (
    <>
      <InputContainer>
        <Input
          value=""
          icon={<AiOutlineSearch size={24} />}
          placeholder="Search Guild"
        />
        <StyledButton data-testid="create-guild-button">
          {' '}
          <StyledLink to={location => `${location.pathname}/createGuild`}>
            {t('guilds.create')}
          </StyledLink>
        </StyledButton>
      </InputContainer>
      <CardsContainer>
        {error ? (
          <>{/* Render error state */}</>
        ) : isLoading ? (
          <>
            {/* Render loading state */}
            <GuildCardLoader />
            <GuildCardLoader />
            <GuildCardLoader />
          </>
        ) : !allGuilds.length ? (
          <>{/* Render empty state */}</>
        ) : (
          /* Render success state */
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
