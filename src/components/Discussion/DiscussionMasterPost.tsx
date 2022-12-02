import { useState, useRef, useEffect } from 'react';
import { DiscussionMasterPostWrapper } from './Discussion.styled';
import { Post } from './Post';
import { Thread } from './Thread';

const DiscussionMasterPost = ({ post }) => {
  const innerPostbox = useRef<any>(null);
  const [replyTo, setReplyTo] = useState<any>(null);
  const [showThread, setShowThread] = useState(false);
  const [scrollToEl, setScrollToEl] = useState<HTMLElement | string | null>(
    null
  );

  const toggleThread = () => {
    setShowThread(!showThread);
  };

  useEffect(() => {
    console.log({ replyTo, showThread, scrollToEl });
  }, [replyTo, showThread, scrollToEl]);

  useEffect(() => {
    if (!showThread) setReplyTo(null);
  }, [showThread]);

  return (
    <DiscussionMasterPostWrapper>
      <Post
        post={post}
        replyTo={replyTo}
        onClickReply={() => {
          setReplyTo(post);
          setShowThread(true);
          setScrollToEl('postbox');
        }}
        toggleThread={toggleThread}
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
    </DiscussionMasterPostWrapper>
  );
};

export default DiscussionMasterPost;
