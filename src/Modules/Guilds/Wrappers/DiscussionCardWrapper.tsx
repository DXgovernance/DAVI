import { Orbis } from '@orbisclub/orbis-sdk';
import { DiscussionCard } from 'components/DiscussionCard';
import { Post } from 'components/Forum/types';
import { useEffect, useRef, useState } from 'react';
import { useTypedParams } from '../Hooks/useTypedParams';
import { Loading } from 'components/primitives/Loading';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import { Button } from 'components/primitives/Button';
import { useTranslation } from 'react-i18next';

const REFRESH_DISCUSSIONS_INTERVAL = 10000; // 10 seconds

const DiscussionCardWrapper = () => {
  let orbis = useRef(new Orbis());
  const { guildId } = useTypedParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  const getPosts = async () => {
    let { data, error } = await orbis.current.getPosts({
      context: guildId,
    });

    if (data) setPosts(data);
    if (error) setError(error);
    if (isLoading) setIsLoading(false);
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
      {isLoading && <Loading loading text />}
      {error && (
        <>
          <Button variant="secondary" onClick={getPosts}>
            {t('reload')}
          </Button>
          <br />
          <ErrorLabel>{error}</ErrorLabel>
        </>
      )}
      {posts.map(post => {
        return <DiscussionCard post={post} />;
      })}
    </div>
  );
};

export default DiscussionCardWrapper;
