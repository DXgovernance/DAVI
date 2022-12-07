import { useState, useRef, useEffect } from 'react';
import { DiscussionMasterPost } from './Discussion.styled';
import { Post } from './Post';
import { Thread } from './Thread';

const MasterPost = ({ post, onDeletion }) => {
  const innerPostbox = useRef<any>(null);
  const masterPost = useRef<any>(null);
  const [replyTo, setReplyTo] = useState<any>(null);
  const [showThread, setShowThread] = useState(false);
  const [scrollToEl, setScrollToEl] = useState<HTMLElement | string | null>(
    null
  );

  const toggleThread = () => {
    setShowThread(!showThread);
  };

  useEffect(() => {
    if (scrollToEl !== null && masterPost.current) {
      if (scrollToEl === 'masterPost' && masterPost.current) {
        setTimeout(() => {
          masterPost.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 500);
      } else if (scrollToEl === 'postbox' && innerPostbox.current) {
        setTimeout(() => {
          innerPostbox.current.scrollIntoView({
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
    <DiscussionMasterPost ref={masterPost}>
      <Post
        post={post}
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
          innerPostbox={innerPostbox}
          onClickReply={post => {
            setReplyTo(post);
            setScrollToEl('postbox');
          }}
          onNewPost={(el: HTMLElement) => setScrollToEl(el)}
        />
      )}
    </DiscussionMasterPost>
  );
};

export default MasterPost;
