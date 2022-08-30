import { Orbis } from '@orbisclub/orbis-sdk';
import { DiscussionCard } from 'components/DiscussionCard';
import { Post } from 'components/Forum/types';
import { useEffect, useRef, useState } from 'react';
import { useTypedParams } from '../Hooks/useTypedParams';

const REFRESH_DISCUSSIONS_INTERVAL = 10000; // 10 seconds

const DiscussionCardWrapper = () => {
  let orbis = useRef(new Orbis());
  const { guildId } = useTypedParams();
  const [posts, setPosts] = useState<Post[]>([]);

  let getPosts = async () => {
    let { data, error } = await orbis.current.getPosts({
      context: guildId,
    });

    if (data) setPosts(data);
    if (error) console.log(error);
  };

  useEffect(() => {
    getPosts();

    const refreshTimer = setInterval(() => {
      getPosts();
    }, REFRESH_DISCUSSIONS_INTERVAL);
    return () => clearInterval(refreshTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button onClick={getPosts}>Refresh</button>
      {posts.map(post => {
        return <DiscussionCard post={post} />;
      })}
    </div>
  );
};

export default DiscussionCardWrapper;
