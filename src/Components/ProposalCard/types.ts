import { ProposalStatusProps } from 'Components/ProposalStatus/types';
import { Proposal, ENSAvatar } from '../Types';
import { Option } from 'Components/ActionsBuilder/types';

export interface ProposalCardProps {
  proposal?: Proposal;
  ensAvatar?: ENSAvatar;
  href?: string;
  statusProps?: ProposalStatusProps;
  options?: Option[];
}
