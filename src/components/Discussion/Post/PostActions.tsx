import { useState, useContext, useRef, useEffect } from 'react';
import {
  BsEmojiLaughing,
  BsEmojiLaughingFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
} from 'react-icons/bs';
import { OrbisContext } from 'contexts/Guilds/orbis';
import {
  IoArrowUndoOutline,
  IoChatboxOutline,
  IoHeartOutline,
  IoHeart,
  IoEllipsisHorizontal,
} from 'react-icons/io5';
import {
  PostActionButton,
  PostActionCount,
  PostOptions,
  PostPopover,
  PostOptionsButton,
} from './Post.styled';
import { useDetectBlur } from 'hooks/Guilds/useDetectBlur';
import { useTranslation } from 'react-i18next';

const PostActions = ({
  post,
  showThreadButton = true,
  toggleThread,
  toggleReply,
  onClickEdit,
  onClickDelete,
}: {
  post: any;
  showThreadButton?: boolean;
  toggleThread: () => void;
  toggleReply: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}) => {
  const { t } = useTranslation();
  const { orbis, profile } = useContext(OrbisContext);

  const [reacted, setReacted] = useState<string>(null);
  const [likes, setLikes] = useState<number>(0);
  const [haha, setHaha] = useState<number>(0);
  const [downvotes, setDownvotes] = useState<number>(0);
  const [showPopover, setShowPopover] = useState(false);

  const postPopover = useRef(null);
  useDetectBlur(postPopover, () => setShowPopover(false));

  const react = async (type: 'like' | 'haha' | 'downvote') => {
    if (!type) return;

    const res = await orbis.react(post.stream_id, type);
    if (res.status === 200) {
      setReacted(type);

      // Decrement previous reaction
      if (reacted === 'like') {
        setLikes(prev => prev - 1);
      } else if (reacted === 'haha') {
        setHaha(prev => prev - 1);
      } else if (reacted === 'downvote') {
        setDownvotes(prev => prev - 1);
      }

      // Increment new reaction
      if (type === 'like') {
        setLikes(prev => prev + 1);
      } else if (type === 'haha') {
        setHaha(prev => prev + 1);
      } else if (type === 'downvote') {
        setDownvotes(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    const getReaction = async () => {
      const { data } = await orbis.getReaction(post?.stream_id, profile?.did);
      if (data) setReacted(data.type);
    };

    if (post && profile) {
      getReaction();
      setLikes(post.count_likes);
      setHaha(post.count_haha);
      setDownvotes(post.count_downvotes);
    }
  }, [post, orbis, profile]);

  return (
    <>
      <PostActionButton title={t('postActions.reply')} onClick={toggleReply}>
        <IoArrowUndoOutline size={20} />
      </PostActionButton>

      {showThreadButton && (
        <PostActionButton
          title={t('postActions.toggleThread')}
          onClick={toggleThread}
        >
          <IoChatboxOutline size={18} />
          <PostActionCount>{post?.count_replies}</PostActionCount>
        </PostActionButton>
      )}

      <PostActionButton
        title={t('postActions.like')}
        active={reacted === 'like'}
        onClick={() => react('like')}
      >
        {reacted === 'like' ? (
          <IoHeart size={20} />
        ) : (
          <IoHeartOutline size={20} />
        )}
        <PostActionCount>{likes}</PostActionCount>
      </PostActionButton>

      <PostActionButton
        title={t('postActions.haha')}
        active={reacted === 'haha'}
        onClick={() => react('haha')}
      >
        {reacted === 'haha' ? (
          <BsEmojiLaughingFill size={18} />
        ) : (
          <BsEmojiLaughing size={18} />
        )}
        <PostActionCount>{haha}</PostActionCount>
      </PostActionButton>

      <PostActionButton
        title={t('postActions.downvote')}
        active={reacted === 'downvote'}
        onClick={() => react('downvote')}
      >
        {reacted === 'downvote' ? (
          <BsHandThumbsDownFill size={18} />
        ) : (
          <BsHandThumbsDown size={18} />
        )}
        <PostActionCount>{downvotes}</PostActionCount>
      </PostActionButton>

      {post?.creator_details?.did === profile?.did && (
        <PostOptions style={{ marginLeft: 'auto' }}>
          <PostActionButton onClick={() => setShowPopover(true)}>
            <IoEllipsisHorizontal size={18} />
          </PostActionButton>
          {showPopover && (
            <PostPopover ref={postPopover}>
              <PostOptionsButton
                onClick={() => {
                  onClickEdit();
                  setShowPopover(false);
                }}
              >
                {t('postOptions.edit')}
              </PostOptionsButton>
              <PostOptionsButton
                danger
                onClick={() => {
                  onClickDelete();
                  setShowPopover(false);
                }}
              >
                {t('postOptions.delete')}
              </PostOptionsButton>
            </PostPopover>
          )}
        </PostOptions>
      )}
    </>
  );
};

export default PostActions;
