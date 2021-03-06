import { Fragment } from 'react';
import { FiCircle } from 'react-icons/fi';
import { Loading } from 'Components/Primitives/Loading';
import {
  Detail,
  BorderedIconDetailWrapper,
  Icon,
  VoteInfoWrapper,
} from 'Components/ProposalCard/ProposalCard.styled';

interface ProposalCardVotesProps {
  isLoading?: boolean;
  votes?: number[];
}

const ProposalCardVotes: React.FC<ProposalCardVotesProps> = ({
  isLoading,
  votes,
}) => {
  if (isLoading) {
    return (
      <Loading
        style={{ margin: 0 }}
        loading
        text
        skeletonProps={{ width: '200px' }}
      />
    );
  }
  return (
    <VoteInfoWrapper>
      <BorderedIconDetailWrapper>
        {votes
          .sort((a, b) => b - a)
          .map((vote, i) => {
            if (i < 3 && !(i === votes.length - 1)) {
              return (
                <Fragment key={i}>
                  <Detail>{vote}%</Detail>
                  <Icon as="div" spaceLeft spaceRight>
                    <FiCircle />
                  </Icon>
                </Fragment>
              );
            } else {
              return <Detail key={i}>{vote}%</Detail>;
            }
          })}
      </BorderedIconDetailWrapper>
    </VoteInfoWrapper>
  );
};

export default ProposalCardVotes;
