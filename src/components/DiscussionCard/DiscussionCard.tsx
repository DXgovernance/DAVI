import { Discussion } from 'components/Forum/types';
import { Flex } from 'components/primitives/Layout';
import { UnstyledLink } from 'components/primitives/Links';
import { shortenAddress } from 'utils';
import { CardTitle, MainWrapper, FooterElement } from './DiscussionCard.styled';
import { BiHeart } from 'react-icons/bi';
import { MdReply } from 'react-icons/md';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';

interface DiscussionCardProps {
  discussion: Discussion;
}

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  discussion,
}) => {
  const creatorAddress = discussion.creator_details.metadata?.address;
  const { ensName } = useENSAvatar(creatorAddress, 1);

  return (
    <UnstyledLink to="#" data-testid="discussion-card">
      <MainWrapper>
        <CardTitle>{discussion.content?.title}</CardTitle>
        <Flex direction="row" justifyContent="flex-start">
          <FooterElement>
            {ensName || shortenAddress(creatorAddress)}
          </FooterElement>
          <FooterElement>
            <BiHeart size="20px" /> {discussion?.count_likes}
          </FooterElement>
          <FooterElement>
            <MdReply size="20px" /> {discussion?.count_replies}
          </FooterElement>
        </Flex>
      </MainWrapper>
    </UnstyledLink>
  );
};
