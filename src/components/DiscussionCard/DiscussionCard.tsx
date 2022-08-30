import { Post } from 'components/Forum/types';
import { Flex } from 'components/primitives/Layout';
import { UnstyledLink } from 'components/primitives/Links';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { MAINNET_ID, shortenAddress } from 'utils';
import { CardTitle, MainWrapper, FooterElement } from './DiscussionCard.styled';
import { BiHeart } from 'react-icons/bi';
import { MdReply } from 'react-icons/md';

interface DiscussionCardProps {
  post: Post;
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({ post }) => {
  console.log(post);
  const creatorAddress = post.creator_details.metadata?.address;
  const ensAvatar = useENSAvatar(creatorAddress, MAINNET_ID);

  return (
    <UnstyledLink to="#" data-testid="discussion-card">
      <MainWrapper>
        <CardTitle>{post.content?.title}</CardTitle>
        <Flex direction="row" justifyContent="flex-start">
          <FooterElement>
            {ensAvatar?.ensName || shortenAddress(creatorAddress)}
          </FooterElement>
          <FooterElement>
            <BiHeart size="20px" /> {post?.count_likes}
          </FooterElement>
          <FooterElement>
            <MdReply size="20px" /> {post?.count_replies}
          </FooterElement>
        </Flex>
      </MainWrapper>
    </UnstyledLink>
  );
};
