import { useState, useRef, useEffect, useContext } from 'react';
import { OrbisContext } from 'contexts/Guilds/orbis';
import { DiscussionMasterPost } from './Discussion.styled';
import { Post } from './Post';
import { Thread } from './Thread';

const MasterPost = ({ post, onDeletion }) => {
  const { orbis } = useContext(OrbisContext);

  const threadPostbox = useRef<any>(null);
  const discussionMasterPost = useRef<any>(null);

  const [masterPost, setMasterPost] = useState(null);
  const [replyTo, setReplyTo] = useState<any>(null);
  const [showThread, setShowThread] = useState(false);
  const [scrollToEl, setScrollToEl] = useState<HTMLElement | string | null>(
    null
  );

  const getMasterPost = async () => {
    const { data, error } = await orbis.getPost(post.stream_id);

    if (error) console.log(error);

    if (data) {
      setMasterPost(data);
      getActualReplies(data);
    }
  };

  const getActualReplies = async (post: any) => {
    const { data } = await orbis.getPosts(
      {
        context: post.context,
        master: post.stream_id,
      },
      0
    );
    setMasterPost({ ...post, count_replies: data.length });
  };

  const toggleThread = () => {
    setShowThread(!showThread);
  };

  const handleThreadUpdated = (posts: any[]) => {
    setMasterPost({ ...masterPost, count_replies: posts.length });
  };

  useEffect(() => {
    if (post) getMasterPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  useEffect(() => {
    if (scrollToEl !== null && discussionMasterPost.current) {
      if (scrollToEl === 'masterPost' && discussionMasterPost.current) {
        setTimeout(() => {
          discussionMasterPost.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 500);
      } else if (scrollToEl === 'postbox' && threadPostbox.current) {
        setTimeout(() => {
          threadPostbox.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 500);
      } else {
        setTimeout(() => {
          const _el = scrollToEl as HTMLElement;
          _el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 500);
      }
    }

    return () => {
      setTimeout(() => {
        setScrollToEl(null);
      }, 500);
    };
  }, [scrollToEl, replyTo, showThread]);

  useEffect(() => {
    if (!showThread) setReplyTo(null);
  }, [showThread]);

  return (
    <DiscussionMasterPost ref={discussionMasterPost}>
      <Post
        post={masterPost}
        replyTo={replyTo}
        onClickReply={post => {
          setReplyTo(post);
          setShowThread(true);
          setScrollToEl('postbox');
        }}
        toggleThread={toggleThread}
        onDeletion={onDeletion}
      />
      {showThread && (
        <Thread
          context={post.context}
          master={post}
          replyTo={replyTo}
          threadPostbox={threadPostbox}
          onClickReply={post => {
            setReplyTo(post);
            setScrollToEl('postbox');
          }}
          onNewPost={(el: HTMLElement) => setScrollToEl(el)}
          onThreadUpdated={handleThreadUpdated}
        />
      )}
    </DiscussionMasterPost>
  );
};

export default MasterPost;
