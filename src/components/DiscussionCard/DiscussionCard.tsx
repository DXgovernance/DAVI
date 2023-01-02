import { Flex } from 'components/primitives/Layout';
import { UnstyledLink } from 'components/primitives/Links';
import { shortenAddress } from 'utils';
import { CardTitle, MainWrapper, FooterElement } from './DiscussionCard.styled';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { DiscussionCardProps } from './types';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  discussion,
}) => {
  const { guildId, chainName } = useTypedParams();
  const creatorAddress = discussion.creator_details.metadata?.address;
  const { ensName } = useENSAvatar(creatorAddress, 1);

  return (
    <UnstyledLink
      to={`/${chainName}/${guildId}/discussion/${discussion.stream_id}`}
      data-testid="discussion-card"
    >
      <MainWrapper>
        <CardTitle>{discussion.content?.title}</CardTitle>
        <Flex direction="row" justifyContent="flex-start">
          <FooterElement>
            {ensName || shortenAddress(creatorAddress)}
          </FooterElement>
        </Flex>
      </MainWrapper>
    </UnstyledLink>
  );
};
