import { Flex } from 'components/primitives/Layout';
import { UnstyledLink } from 'components/primitives/Links';
import { shortenAddress } from 'utils';
import { CardTitle, MainWrapper, FooterElement } from './DiscussionCard.styled';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { DiscussionCardProps } from './types';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { MdReply } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { BsHandThumbsDown } from 'react-icons/bs';
import { IoHeartOutline } from 'react-icons/io5';
import { Avatar } from 'components/Avatar';
import { FaRegLaughSquint } from 'react-icons/fa';

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  discussion,
}) => {
  const { guildId, chainName } = useTypedParams();
  const { orbis } = useOrbisContext();
  const creatorAddress = discussion.creator_details.metadata?.address;
  const { ensName } = useENSAvatar(creatorAddress, 1);
  const [replyCount, setReplyCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await orbis.getPosts({
        context: `DAVI-${guildId}-${discussion.stream_id}-discussions`,
      });
      setReplyCount(data?.length);
    };
    fetchData();
  }, [discussion, guildId, orbis]);

  return (
    <UnstyledLink
      to={`/${chainName}/${guildId}/discussion/${discussion.stream_id}`}
      data-testid="discussion-card"
    >
      <MainWrapper>
        <CardTitle>{discussion.content?.title}</CardTitle>
        <Flex direction="row" justifyContent="flex-start">
          <FooterElement>
            <Avatar
              src={discussion?.creator_details?.profile?.pfp}
              defaultSeed={discussion?.creator_details?.metadata?.address}
              size={24}
            />
            {ensName || shortenAddress(creatorAddress)}
          </FooterElement>
          <FooterElement>
            <IoHeartOutline size="20px" /> {discussion?.count_likes}
          </FooterElement>
          <FooterElement>
            <FaRegLaughSquint size="18px" /> {discussion?.count_haha}
          </FooterElement>
          <FooterElement>
            <BsHandThumbsDown size="20px" /> {discussion?.count_downvotes}
          </FooterElement>
          <FooterElement>
            <MdReply size="20px" /> {replyCount}
          </FooterElement>
        </Flex>
      </MainWrapper>
    </UnstyledLink>
  );
};
