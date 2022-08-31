import { Post } from 'components/Forum/types';
import { Flex } from 'components/primitives/Layout';
import { UnstyledLink } from 'components/primitives/Links';
import { shortenAddress } from 'utils';
import { CardTitle, MainWrapper, FooterElement } from './DiscussionCard.styled';
import { BiHeart } from 'react-icons/bi';
import { MdReply } from 'react-icons/md';

interface DiscussionCardProps {
  post: Post;
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({ post }) => {
  const creatorAddress = post.creator_details.metadata?.address;

  return (
    <UnstyledLink to="#" data-testid="discussion-card">
      <MainWrapper>
        <CardTitle>{post.content?.title}</CardTitle>
        <Flex direction="row" justifyContent="flex-start">
          <FooterElement>{shortenAddress(creatorAddress)}</FooterElement>
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
