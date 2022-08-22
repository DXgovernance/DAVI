import { ProposalStatusProps } from 'components/ProposalStatus/types';
import { Proposal, ENSAvatar } from '../Types';
import { Option } from 'components/ActionsBuilder/types';

export interface ProposalCardProps {
  proposal?: Proposal;
  ensAvatar?: ENSAvatar;
  href?: string;
  statusProps?: ProposalStatusProps;
  options?: Option[];
}
