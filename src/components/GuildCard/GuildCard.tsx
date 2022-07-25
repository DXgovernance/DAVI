import UnstyledLink from 'components/Primitives/Links/UnstyledLink';
import { Card } from 'old-components/Guilds/common/Card/index';
import GuildCardHeader from './GuildCardHeader';
import GuildCardContent from './GuildCardContent';
import { cardWrapperStyles } from './styles';
import { GuildCardProps } from './types';
import { Flex } from 'components/Primitives/Layout';
import { navigateUrl } from 'utils';

const GuildCard: React.FC<GuildCardProps> = ({
  isLoading,
  guildAddress,
  numberOfMembers,
  t,
  numberOfActiveProposals,
  ensName,
  data,
}) => {
  return (
    <UnstyledLink
      data-testid="guildCard"
      to={location => navigateUrl(location, guildAddress)}
    >
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

export default GuildCard;
