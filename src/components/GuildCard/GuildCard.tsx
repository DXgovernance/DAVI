import { UnstyledLink } from 'components/Primitives/Links';
import { Flex } from 'components/Primitives/Layout';
import { Card } from 'components/Card';
import { cardWrapperStyles } from './GuildCard.styled';
import { GuildCardProps } from './types';
import { GuildCardHeader, GuildCardContent } from './components';

export const GuildCard: React.FC<GuildCardProps> = ({
  isLoading,
  guildAddress,
  numberOfMembers,
  t,
  numberOfActiveProposals,
  ensName,
  data,
}) => {
  return (
    <UnstyledLink data-testid="guildCard" to={guildAddress || '#'}>
      <Flex>
        <Card customStyles={cardWrapperStyles}>
          <GuildCardHeader
            isLoading={isLoading}
            numberOfMembers={numberOfMembers}
            t={t}
            numberOfActiveProposals={numberOfActiveProposals}
          />
          <GuildCardContent
            isLoading={isLoading}
            ensName={ensName}
            data={data}
          />
        </Card>
      </Flex>
    </UnstyledLink>
  );
};
