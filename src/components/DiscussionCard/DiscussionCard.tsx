import { Post } from 'components/Forum/types';
import { Flex } from 'components/primitives/Layout';
import { UnstyledLink } from 'components/primitives/Links';
import {
  CardWrapper,
  CardContent,
  CardTitle,
} from 'components/ProposalCard/styles';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { MAINNET_ID, shortenAddress } from 'utils';

interface DiscussionCardProps {
  post: Post;
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({ post }) => {
  console.log(post);
  const creatorAddress = post.creator_details.metadata?.address;
  const ensAvatar = useENSAvatar(creatorAddress, MAINNET_ID);

  return (
    <UnstyledLink to="#" data-testid="discussion-card">
      <CardWrapper>
        <CardContent>
          <CardTitle size={2}>
            <strong>{post.content?.title}</strong>
          </CardTitle>
        </CardContent>
        <Flex direction="row" justifyContent="flex-start">
          <div>{ensAvatar?.ensName || shortenAddress(creatorAddress)} - </div>
          <div>{post?.count_likes} likes - </div>
          <div>{post?.count_replies} replies</div>
        </Flex>
      </CardWrapper>
    </UnstyledLink>
  );
};
