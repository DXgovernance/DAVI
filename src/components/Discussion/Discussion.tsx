import { useState, useEffect, useContext } from 'react';
import { OrbisContext } from 'contexts/Guilds/orbis';

import { DiscussionCard } from './DiscussionCard';
import { Postbox } from './Postbox';
import { Divider } from 'components/Divider';
import DiscussionMasterPost from './DiscussionMasterPost';
import {
  DiscussionContainer,
  DiscussionHeader,
  DiscussionTitle,
  DiscussionPostboxWrapper,
} from './Discussion.styled';

function Discussion({
  context,
  master,
  algorithm = 'all-context-master-posts',
}: {
  context: string;
  master: string;
  algorithm?: string;
}) {
  const { orbis } = useContext(OrbisContext);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    console.log('get posts');
    const { data, error } = await orbis.getPosts({
      context,
      master,
      algorithm,
    });

    if (error) console.log(error);

    if (data) {
      console.log(data);
      setPosts(data);
    }
  };

  const onNewMasterPostCreated = newPost => {
    setPosts(prev => {
      return { newPost, ...prev };
    });
  };

  useEffect(() => {
    if (context) {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <DiscussionContainer>
      <DiscussionCard
        header={
          <DiscussionHeader>
            <DiscussionTitle>Discussion</DiscussionTitle>
          </DiscussionHeader>
        }
      >
        <DiscussionPostboxWrapper>
          <Postbox
            context={context}
            callback={onNewMasterPostCreated}
            enterToShare={true}
          />
        </DiscussionPostboxWrapper>

        <Divider />

        {posts.length > 0 ? (
          posts.map(post => (
            <DiscussionMasterPost key={post.stream_id} post={post} />
          ))
        ) : (
          <p>No posts</p>
        )}
      </DiscussionCard>
    </DiscussionContainer>
  );
}

export default Discussion;
