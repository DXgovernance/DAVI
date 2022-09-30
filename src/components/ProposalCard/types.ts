import { ProposalStatusProps } from 'components/ProposalStatus/types';
import { Proposal, ENSAvatar } from 'types/types.guilds';
import { Option } from 'components/ActionsBuilder/types';

export interface ProposalCardProps {
  proposal?: Proposal;
  ensAvatar?: ENSAvatar;
  href?: string;
  statusProps?: ProposalStatusProps;
  options?: Option[];
  address?: string;
}
