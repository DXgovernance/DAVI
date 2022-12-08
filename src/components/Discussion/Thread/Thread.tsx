import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
  LegacyRef,
} from 'react';
import { OrbisContext } from 'contexts/Guilds/orbis';
import { useInterval } from 'utils';
import { MasterGroup, MasterGroupPostbox, ThreadGroup } from './Thread.styled';
import { Post } from '../Post';
import { Postbox } from '../Postbox';

const Group = ({
  items,
  replies,
  replyTo = null,
  onClickReply,
  onDeletion,
}: {
  items: any[];
  replies: Record<string, any[]>;
  replyTo: any;
  onClickReply: (value: any) => void;
  onDeletion: (post: any) => void;
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
  master: any;
  threadPostbox: LegacyRef<HTMLDivElement> | null;
  replyTo: any;
  onClickReply: (value: any) => void;
  onNewPost: (el: HTMLElement) => void;
  onThreadUpdated: (posts: any[]) => void;
}) => {
  const { orbis } = useContext(OrbisContext);

  const mainGroup = useRef<any>(null);

  const [posts, setPosts] = useState([]);
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
          (a: any) => !_posts.some(b => a.stream_id === b.stream_id)
        );
        if (unique.length > 0) {
          setPosts([..._posts, ...unique]);
        }
      }
    }
  };

  const callback = (newPost: any) => {
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

  const handleDeletion = async (post: any) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?\r\nIf you ask for deletion your post might be removed from the Ceramic nodes hosting it.'
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
