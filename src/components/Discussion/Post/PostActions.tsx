import { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
// import { OrbisContext } from 'contexts/Guilds/orbis';
import {
  IoArrowUndoOutline,
  IoChatboxOutline,
  IoHeartOutline,
} from 'react-icons/io5';
import { PostActionButton, PostActionCount } from './Post.styled';

const PostActions = ({
  post,
  toggleThread,
}: {
  post: any;
  toggleThread: () => void;
}) => {
  // const { orbis } = useContext(OrbisContext);
  const [likes, setLikes] = useState<number>(post.count_likes);

  const react = async (type: 'like' | 'haha' | 'downvote') => {
    if (!type) return;

    setLikes(prev => prev + 1);

    // const res = await orbis.react(post.did, type)
    // if (res.status === 200) setLikes(prev => prev + 1)
  };

  return (
    <>
      <PostActionButton>
        <IoArrowUndoOutline size={20} />
      </PostActionButton>
      <PostActionButton onClick={toggleThread}>
        <IoChatboxOutline size={18} />
        <PostActionCount>{post.count_replies}</PostActionCount>
      </PostActionButton>
      <PostActionButton onClick={() => react('like')}>
        <IoHeartOutline size={20} />
        <PostActionCount>{likes}</PostActionCount>
      </PostActionButton>
      <PostActionButton>
        <BsEmojiSmile size={18} />
      </PostActionButton>
    </>
  );
};

export default PostActions;
