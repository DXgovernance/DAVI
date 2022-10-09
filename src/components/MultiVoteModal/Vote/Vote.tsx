import { useState } from 'react';
import { Vote as VoteInterface } from 'contexts/Guilds/voteCart';
import { HiChevronDown } from 'react-icons/hi';
import { HiChevronUp } from 'react-icons/hi';
import { Button } from 'components/primitives/Button';

import {
  VoteWrapper,
  Title,
  Row,
  DescriptionLabel,
  SelectedOptionBox,
} from './Vote.styled';

interface VoteProps {
  vote: VoteInterface;
  selected: boolean;
  toggle: (vote: VoteInterface) => void;
  removeVote: () => void;
}
export const Vote = ({ vote, toggle, selected, removeVote }: VoteProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <VoteWrapper selected={selected} onClick={() => toggle(vote)}>
      <Row>
        <Title>{vote.proposal.title}</Title>

        {expanded ? (
          <HiChevronUp size={20} onClick={() => setExpanded(false)} />
        ) : (
          <HiChevronDown size={20} onClick={() => setExpanded(true)} />
        )}
      </Row>
      {expanded && (
        <>
          <DescriptionLabel>
            {vote.proposal?.metadata?.description}
          </DescriptionLabel>

          <SelectedOptionBox>
            <span>Option</span>
            <span>{vote.optionLabel}</span>
          </SelectedOptionBox>
        </>
      )}
      <Button variant="secondary" onClick={removeVote}>
        Delete
      </Button>
    </VoteWrapper>
  );
};

