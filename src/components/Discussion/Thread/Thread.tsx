import { useState, useMemo, useRef, useEffect, LegacyRef } from 'react';
import { useOrbisContext } from 'contexts/Guilds/orbis';
import { useInterval } from 'utils';
import { MasterGroup, MasterGroupPostbox, ThreadGroup } from './Thread.styled';
import { Post } from '../Post';
import { Postbox } from '../Postbox';
import { IOrbisPost } from 'types/types.orbis';
import { useTranslation } from 'react-i18next';

const Group = ({
  items,
  replies,
  replyTo = null,
  onClickReply,
  onDeletion,
}: {
  items: IOrbisPost[];
  replies: Record<string, IOrbisPost[]>;
  replyTo: IOrbisPost;
  onClickReply: (value: IOrbisPost) => void;
  onDeletion: (post: IOrbisPost) => void;
}) => {
  return (
    <>
      {items.map(item => (
        <ThreadGroup key={item.stream_id}>
          <Post
            post={item}
            replyTo={replyTo}
            showThreadButton={false}
            onClickReply={() => onClickReply(item)}
            onDeletion={() => onDeletion(item)}
          />
          {replies[item.stream_id] !== undefined && (
            <Group
              items={replies[item.stream_id]}
              replies={replies}
              replyTo={replyTo}
              onClickReply={onClickReply}
              onDeletion={onDeletion}
            />
          )}
        </ThreadGroup>
      ))}
    </>
  );
};

const Thread = ({
  context,
  master,
  threadPostbox,
  replyTo,
  onClickReply,
  onNewPost,
  onThreadUpdated,
}: {
  context: string | undefined;
  master: IOrbisPost;
  threadPostbox: LegacyRef<HTMLDivElement> | null;
  replyTo: IOrbisPost;
  onClickReply: (value: IOrbisPost) => void;
  onNewPost: (el: HTMLElement) => void;
  onThreadUpdated: (posts: IOrbisPost[]) => void;
}) => {
  const { orbis } = useOrbisContext();
  const { t } = useTranslation();

  const mainGroup = useRef<HTMLDivElement>(null);

  const [posts, setPosts] = useState<IOrbisPost[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [pausePolling, setPausePolling] = useState(false);

  const groups = useMemo(() => {
    const grouped = posts.reduce((result, a) => {
      result[a.reply_to] = [...(result[a.reply_to] || []), a];
      return result;
    }, {});
    return grouped;
  }, [posts]);

  const getPosts = async ({ polling = false, reset = false }) => {
    if (!orbis || !context || !master || isFetching) return;

    if (!polling) {
      setIsFetching(true);
      setPausePolling(true);
    }

    const _posts = reset ? [] : [...posts];

    const { data, error } = await orbis.getPosts(
      { context, master: master.stream_id },
      polling || reset ? 0 : page
    );

    if (error) console.log(error);

    if (data) {
      data.reverse();
      if (!polling) {
        const nextPage = reset ? 1 : page + 1;
        setPage(nextPage);
        setPosts([...data, ..._posts]);
        setPausePolling(false);
        setIsFetching(false);
      } else {
        const unique = data.filter(
          (a: IOrbisPost) => !_posts.some(b => a.stream_id === b.stream_id)
        );
        if (unique.length > 0) {
          setPosts([..._posts, ...unique]);
        }
      }
    }
  };

  const callback = (newPost: IOrbisPost) => {
    const _posts = [...posts, newPost];
    setPosts(_posts);
    onClickReply(null);
    onThreadUpdated(_posts);

    // Try scroll to newly created post
    if (newPost.stream_id.startsWith('new_post-')) {
      setTimeout(() => {
        const el: HTMLElement = mainGroup.current?.querySelector(
          `.${newPost.stream_id}`
        );
        onNewPost(el);
      }, 100);
    }
  };

  const handleDeletion = async (post: IOrbisPost) => {
    const confirmed = window.confirm(
      `${t('deletionMessage1')}'\r\n${t('deletionMessage2')}`
    );
    if (confirmed) {
      const res = await orbis.deletePost(post.stream_id);
      if (res.status === 200) {
        const _posts = posts.filter(o => o.stream_id !== post.stream_id);
        setPosts(_posts);
        onThreadUpdated(_posts);
      }
    }
  };

  useInterval(() => getPosts({ polling: true }), !pausePolling ? 10000 : null);

  useEffect(() => {
    if (context && master) getPosts({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, master]);

  return (
    <MasterGroup ref={mainGroup}>
      {groups[master.stream_id] !== undefined && (
        <Group
          items={groups[master.stream_id]}
          replies={groups}
          replyTo={replyTo}
          onClickReply={onClickReply}
          onDeletion={handleDeletion}
        />
      )}
      {replyTo && (
        <MasterGroupPostbox ref={threadPostbox}>
          <Postbox
            context={context}
            replyTo={replyTo}
            cancelReplyTo={() => onClickReply(null)}
            callback={callback}
            placeholder="Share your reply here..."
          />
        </MasterGroupPostbox>
      )}
    </MasterGroup>
  );
};

export default Thread;
