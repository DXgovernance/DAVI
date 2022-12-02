import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
  LegacyRef,
} from 'react';
import { OrbisContext } from 'contexts/Guilds/orbis';
import { ThreadGroup } from './Thread.styled';
import { Post } from '../Post';
import { Postbox } from '../Postbox';

const Group = ({
  items,
  replies,
  replyTo = null,
  onClickReply,
}: {
  items: any[];
  replies: Record<string, any[]>;
  replyTo: any;
  onClickReply: (value: any) => void;
}) => {
  return (
    <>
      {items.map(item => (
        <ThreadGroup key={item.stream_id}>
          <Post
            post={item}
            replyTo={replyTo}
            onClickReply={() => onClickReply(item)}
          />
          {replies[item.stream_id] !== undefined && (
            <Group
              items={replies[item.stream_id]}
              replies={replies}
              replyTo={replyTo}
              onClickReply={onClickReply}
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
  innerPostbox,
  replyTo,
  onClickReply,
  onNewPost,
}: {
  context: string | undefined;
  master: any;
  innerPostbox: LegacyRef<HTMLDivElement> | null;
  replyTo: any;
  onClickReply: (value: any) => void;
  onNewPost: (el: HTMLElement) => void;
}) => {
  const { orbis } = useContext(OrbisContext);

  const mainGroup = useRef<any>(null);

  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const groups = useMemo(() => {
    const grouped = posts.reduce((result, a) => {
      result[a.reply_to] = [...(result[a.reply_to] || []), a];
      return result;
    }, {});
    return grouped;
  }, [posts]);

  const getPosts = async () => {
    if (!orbis || !context || !master || isLoading) return;

    setIsLoading(true);

    const { data, error } = await orbis.getPosts(
      { context, master: master.stream_id },
      currentPage
    );

    if (data) {
      data.reverse();
      setPosts([...posts, ...data]);
      setCurrentPage(prev => prev + 1);
      // setHasMore(data.length >= 50)
    }

    if (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const callback = newPost => {
    const _posts = [...posts, newPost];
    setPosts(_posts);
    onClickReply(null);

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

  useEffect(() => {
    if (context && master) getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, master]);

  return (
    <div ref={mainGroup}>
      {groups[master.stream_id] !== undefined && (
        <Group
          items={groups[master.stream_id]}
          replies={groups}
          replyTo={replyTo}
          onClickReply={onClickReply}
        />
      )}
      {replyTo && (
        <div ref={innerPostbox}>
          <Postbox
            context={context}
            replyTo={replyTo}
            cancelReplyTo={() => onClickReply(null)}
            callback={callback}
          />
        </div>
      )}
    </div>
  );
};

export default Thread;
