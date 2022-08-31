import { Orbis } from '@orbisclub/orbis-sdk';
import { DiscussionCard } from 'components/DiscussionCard';
import { Post } from 'components/Forum/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTypedParams } from '../Hooks/useTypedParams';
import { Loading } from 'components/primitives/Loading';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import { Button } from 'components/primitives/Button';
import { useTranslation } from 'react-i18next';
import useIsProposalCreationAllowed from 'hooks/Guilds/useIsProposalCreationAllowed';
import { StyledLink } from 'Modules/Guilds/pages/Governance/Governance.styled';
import { Virtuoso } from 'react-virtuoso';

const REFRESH_DISCUSSIONS_INTERVAL = 10000; // 10 seconds
const DISCUSSIONS_TO_SHOW = 10;

const DiscussionCardWrapper = () => {
  let orbis = useRef(new Orbis());
  const [discussions, setDiscussions] = useState<Post[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfDiscussionsToShow, setNumberOfDiscussionsToShow] =
    useState(DISCUSSIONS_TO_SHOW);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMoreDiscussionsToFetch, setNoMoreDiscussionsToFetch] =
    useState(false);

  const { chainName, guildId } = useTypedParams();
  const { t } = useTranslation();
  const isProposalCreationAllowed = useIsProposalCreationAllowed();

  const getDiscussions = async (page: number = 0) => {
    setIsLoading(true);
    console.log('querying to orbis');
    console.log('page: ', page);
    let { data, error } = await orbis.current.getPosts(
      {
        context: guildId,
      },
      page
    );
    // ! Just to test various proposals
    // ! delete before merging
    // let { data, error } = await orbis.current.getPosts(
    //   {
    //     algorithm: 'all-master-posts',
    //   },
    //   page
    // );

    setIsLoading(false);

    if (error) {
      setError(error);
      return [];
    }

    return data;
  };

  const addToDiscussionList = async (page: number) => {
    if (!noMoreDiscussionsToFetch) {
      let newDiscussions = await getDiscussions(page);

      if (newDiscussions.length === 0) setNoMoreDiscussionsToFetch(true);
      else setDiscussions([...discussions, ...newDiscussions]);
    }
  };

  useEffect(() => {
    let firstPage = 0;
    addToDiscussionList(firstPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shownDiscussions = useMemo(() => {
    if (!discussions) return null;
    return discussions.slice(0, numberOfDiscussionsToShow);
  }, [discussions, numberOfDiscussionsToShow]);

  const showMoreDiscussions = () => {
    const newNumberOfDiscussionsToShow =
      numberOfDiscussionsToShow + DISCUSSIONS_TO_SHOW;

    if (numberOfDiscussionsToShow < discussions.length) {
      setNumberOfDiscussionsToShow(newNumberOfDiscussionsToShow);

      if (newNumberOfDiscussionsToShow >= discussions.length) {
        const nextPage = currentPage + 1;
        addToDiscussionList(nextPage);
        setCurrentPage(nextPage);
      }
    }
  };

  useEffect(() => {
    const refreshDiscussionInterval = setInterval(async () => {
      let refreshedDiscussions = [];

      for (let i = 0; i <= currentPage; i++) {
        let result = await getDiscussions(i);
        refreshedDiscussions = [...refreshedDiscussions, ...result];
      }

      setDiscussions(refreshedDiscussions);
    }, REFRESH_DISCUSSIONS_INTERVAL);

    return () => clearInterval(refreshDiscussionInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const Footer = () => {
    if (isLoading) return <Loading loading text />;
    return <div>{t('noMoreDiscussions')}.</div>;
  };

  if (error) {
    return (
      <>
        <Button variant="secondary" onClick={() => getDiscussions(0)}>
          {t('reload')}
        </Button>
        <br />
        <ErrorLabel>{error}</ErrorLabel>
      </>
    );
  }

  return (
    <>
      {discussions?.length === 0 &&
        !isLoading &&
        `${t('forum.thereAreNoDiscussions')}. `}
      {discussions?.length === 0 && !isLoading && isProposalCreationAllowed && (
        <StyledLink to={`/${chainName}/${guildId}/create`}>
          {t('forum.createDiscussionWordy')}.
        </StyledLink>
      )}
      {discussions.length > 0 && (
        <Virtuoso
          useWindowScroll
          totalCount={shownDiscussions?.length}
          data={shownDiscussions}
          itemContent={index => (
            <DiscussionCard post={shownDiscussions[index]} />
          )}
          endReached={showMoreDiscussions}
          components={{ Footer }}
        />
      )}
    </>
  );
};

export default DiscussionCardWrapper;