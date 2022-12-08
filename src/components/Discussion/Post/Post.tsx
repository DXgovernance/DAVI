import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { OrbisContext } from 'contexts/Guilds/orbis';
import { getUsername, getBadgeContent, formatMessage } from 'utils/orbis';
import { Avatar } from 'components/Avatar';
import {
  PostWrapper,
  PostHeader,
  PostBody,
  PostEditedBadge,
  PostMetadata,
  PostMetadataImage,
  PostMetadataContent,
  PostCreatorName,
  PostCreatorAddressBadge,
  PostTime,
  PostFooter,
} from './Post.styled';
import PostActions from './PostActions';
import { Postbox } from '../Postbox';
import { useTranslation } from 'react-i18next';

const Post = ({
  post,
  replyTo = null,
  showThreadButton = true,
  onClickReply,
  toggleThread,
  onDeletion,
}: {
  post: any;
  replyTo: any;
  showThreadButton?: boolean;
  onClickReply: (value: any) => void;
  toggleThread?: () => void;
  onDeletion: () => void;
}) => {
  const { t } = useTranslation();
  const { orbis } = useContext(OrbisContext);

  const [postClone, setPostClone] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getPost = async () => {
    console.log('fetch post');
    const { data, error } = await orbis.getPost(post.stream_id);

    if (error) {
      setPostClone({ ...post });
    }

    if (data) {
      setPostClone(data);
    }
  };

  const handleEdited = async (content: any) => {
    setPostClone({
      ...postClone,
      content,
      count_commits: postClone.count_commits + 1,
    });
    setIsEditing(false);
  };

  useEffect(() => {
    if (!post?.reply_to && !post?.master) {
      console.log('master post');
      setPostClone({ ...post });
    } else {
      getPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <PostWrapper>
      <PostHeader>
        <Avatar
          src={postClone?.creator_details?.profile?.pfp}
          defaultSeed={postClone?.creator_details?.metadata?.address}
          size={24}
        />
        <PostCreatorName>
          {getUsername(postClone?.creator_details)}
        </PostCreatorName>
        <PostCreatorAddressBadge>
          {getBadgeContent(postClone?.creator_details)}
        </PostCreatorAddressBadge>
        <PostTime>
          {postClone?.timestamp && moment.unix(postClone.timestamp).fromNow()}
        </PostTime>
      </PostHeader>
      {!isEditing ? (
        <>
          <PostBody>
            {formatMessage(postClone?.content)}
            {postClone?.count_commits > 1 && (
              <PostEditedBadge>({t('postEdited')})</PostEditedBadge>
            )}
          </PostBody>
          {postClone?.indexing_metadata?.urlMetadata && (
            <PostMetadata>
              {postClone?.indexing_metadata?.urlMetadata?.image && (
                <PostMetadataImage
                  href={postClone?.indexing_metadata?.urlMetadata?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={postClone?.indexing_metadata?.urlMetadata?.image}
                    alt=""
                  />
                </PostMetadataImage>
              )}
              <PostMetadataContent>
                <small>
                  {postClone?.indexing_metadata?.urlMetadata?.source}
                </small>
                <h3>
                  <a
                    href={postClone?.indexing_metadata?.urlMetadata?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {postClone?.indexing_metadata?.urlMetadata?.title}
                  </a>
                </h3>
                <p>{postClone?.indexing_metadata?.urlMetadata?.description}</p>
              </PostMetadataContent>
            </PostMetadata>
          )}
        </>
      ) : (
        <Postbox
          context={postClone.context}
          editPost={postClone}
          callback={handleEdited}
          cancelEdit={() => setIsEditing(false)}
          hideShareButton={true}
        />
      )}
      <PostFooter>
        <PostActions
          post={postClone}
          showThreadButton={showThreadButton}
          toggleThread={toggleThread}
          toggleReply={() => onClickReply(post)}
          onClickDelete={onDeletion}
          onClickEdit={() => setIsEditing(true)}
        />
      </PostFooter>
    </PostWrapper>
  );
};

export default Post;
