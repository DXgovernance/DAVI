import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { OrbisContext } from 'contexts/Guilds/orbis';
import { useInterval } from 'utils';

import { Postbox } from './Postbox';
import { Divider } from 'components/Divider';
import DiscussionMasterPost from './DiscussionMasterPost';
import {
  DiscussionContainer,
  DiscussionMasterPosts,
  DiscussionPostboxWrapper,
  DiscussionLoadMore,
  LoadMoreButton,
  DiscussionEmpty,
} from './Discussion.styled';
import { Box } from 'components/primitives/Layout';
import { IOrbisPost } from 'types/types.orbis';

function Discussion({
  context,
  master = '',
  algorithm = 'all-context-master-posts',
}: {
  context: string;
  master?: string;
  algorithm?: string;
}) {
  const { t } = useTranslation();
  const { orbis } = useContext(OrbisContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pausePolling, setPausePolling] = useState(false);

  const getPosts = async ({ polling = false, reset = false }) => {
    if (isFetching || !context || !orbis) return;

    if (!polling) {
      setPausePolling(true);
      setIsFetching(true);
    }

    const _posts = reset ? [] : [...posts];

    const { data, error } = await orbis.getPosts(
      {
        context,
        master,
        algorithm,
      },
      polling || reset ? 0 : page
    );

    if (error) console.log(error);

    if (data) {
      if (!polling) {
        const nextPage = reset ? 1 : page + 1;
        setPage(nextPage);
        setPosts([..._posts, ...data]);
        setHasMore(data.length >= 50);
        setPausePolling(false);
        setIsFetching(false);
      } else {
        const unique = data.filter(
          (a: IOrbisPost) => !_posts.some(b => a.stream_id === b.stream_id)
        );
        if (unique.length > 0) {
          setPosts([...unique, ..._posts]);
        }
      }
    }
  };

  const onNewMasterPostCreated = (newPost: IOrbisPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletion = async (post: IOrbisPost) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?\r\nIf you ask for deletion your post might be removed from the Ceramic nodes hosting it.'
    );
    if (confirmed) {
      const res = await orbis.deletePost(post.stream_id);
      if (res.status === 200) {
        const _posts = posts.filter(o => o.stream_id !== post.stream_id);
        setPosts(_posts);
        console.log('deleted:', post);
      }
    }
  };

  useInterval(() => getPosts({ polling: true }), !pausePolling ? 10000 : null);

  useEffect(() => {
    if (context) {
      getPosts({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <DiscussionContainer>
      <DiscussionPostboxWrapper>
        <Postbox
          context={context}
          callback={onNewMasterPostCreated}
          enterToShare={false}
        />
      </DiscussionPostboxWrapper>

      <Divider />

      <DiscussionMasterPosts>
        {posts.length > 0 ? (
          posts.map(post => (
            <DiscussionMasterPost
              key={post.stream_id}
              post={post}
              onDeletion={() => handleDeletion(post)}
            />
          ))
        ) : (
          <DiscussionEmpty>
            <VscCommentDiscussion size={56} />
            <Box>{t('discussionEmpty')}</Box>
          </DiscussionEmpty>
        )}
      </DiscussionMasterPosts>

      {hasMore && (
        <DiscussionLoadMore>
          <LoadMoreButton onClick={() => getPosts({})}>
            {t('discussionLoadMore')}
          </LoadMoreButton>
        </DiscussionLoadMore>
      )}
    </DiscussionContainer>
  );
}

export default Discussion;
