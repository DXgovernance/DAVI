import moment from 'moment';
import { getUsername, getBadgeContent, formatMessage } from 'utils/orbis';
import { Avatar } from 'components/Avatar';
import {
  PostWrapper,
  PostHeader,
  PostBody,
  PostCreatorName,
  PostCreatorAddressBadge,
  PostTime,
  PostFooter,
} from './Post.styled';
import PostActions from './PostActions';

const Post = ({
  post,
  replyTo = null,
  onClickReply,
  toggleThread,
}: {
  post: any;
  replyTo: any;
  onClickReply: () => void;
  toggleThread?: () => void;
}) => {
  return (
    <PostWrapper>
      <PostHeader>
        <Avatar
          src={post.creator_details?.profile?.pfp}
          defaultSeed={post.creator_details?.metadata?.address}
          size={24}
        />
        <PostCreatorName>{getUsername(post.creator_details)}</PostCreatorName>
        <PostCreatorAddressBadge>
          {getBadgeContent(post.creator_details)}
        </PostCreatorAddressBadge>
        <PostTime>{moment.duration(post.timestamp).humanize()}</PostTime>
      </PostHeader>
      <PostBody>{formatMessage(post.content)}</PostBody>
      <PostFooter>
        <PostActions post={post} toggleThread={toggleThread} />
      </PostFooter>
    </PostWrapper>
  );
};

export default Post;
