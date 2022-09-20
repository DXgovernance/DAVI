import { ProposalCardProps } from 'components/ProposalCard/types';
import { Avatar } from 'components/Avatar';
import { ProposalStatus } from 'components/ProposalStatus';
import { Loading } from 'components/primitives/Loading';
import { UnstyledLink } from 'components/primitives/Links';
import 'react-loading-skeleton/dist/skeleton.css';
import { shortenAddress } from 'utils';
import {
  ProposalCardWrapper,
  CardHeader,
  IconDetailWrapper,
  Detail,
  CardContent,
  CardTitle,
  CardFooter,
} from './ProposalCard.styled';
import ProposalCardWinningOption from './ProposalCardWinningOption/ProposalCardWinningOption';
import ProposalCardActions from './ProposalCardActions/ProposalCardActions';

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  ensAvatar,
  href,
  statusProps,
  options,
  address,
}) => {
  return (
    <UnstyledLink to={href || '#'} data-testid="proposal-card">
      <ProposalCardWrapper disabled={!href}>
        <CardHeader>
          <IconDetailWrapper>
            <Avatar
              src={ensAvatar?.imageUrl}
              defaultSeed={proposal?.creator}
              size={24}
            />
            <Detail>
              {ensAvatar?.ensName ||
                (proposal?.creator ? (
                  shortenAddress(proposal.creator)
                ) : (
                  <Loading style={{ margin: 0 }} loading text />
                ))}
            </Detail>
          </IconDetailWrapper>
          <ProposalStatus {...statusProps} />
        </CardHeader>
        <CardContent>
          <CardTitle size={2}>
            <strong>
              {proposal?.title || (
                <Loading style={{ margin: 0 }} loading text />
              )}
            </strong>
          </CardTitle>
        </CardContent>
        <CardFooter>
          <ProposalCardWinningOption options={options} />
          <ProposalCardActions
            votesOfVoters={proposal?.votesOfVoters}
            proposalCreated={proposal?.creator}
            userAddress={address}
          />
        </CardFooter>
      </ProposalCardWrapper>
    </UnstyledLink>
  );
};
