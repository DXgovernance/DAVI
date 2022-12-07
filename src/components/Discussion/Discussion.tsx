import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { OrbisContext } from 'contexts/Guilds/orbis';

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
  const [hasMore, setHasMore] = useState(false);

  const getPosts = async () => {
    console.log('get posts');
    const { data, error } = await orbis.getPosts(
      {
        context,
        master,
        algorithm,
      },
      page
    );

    if (error) console.log(error);

    if (data) {
      setHasMore(data.length >= 50);
      setPosts([...posts, ...data]);
      setPage(prev => prev + 1);
    }
  };

  const onNewMasterPostCreated = (newPost: any) => {
    setPosts([newPost, ...posts]);
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
        console.log('deleted:', post);
      }
    }
  };

  useEffect(() => {
    if (context) {
      getPosts();
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
          <LoadMoreButton onClick={getPosts}>
            {t('discussionLoadMore')}
          </LoadMoreButton>
        </DiscussionLoadMore>
      )}
    </DiscussionContainer>
  );
}

export default Discussion;
