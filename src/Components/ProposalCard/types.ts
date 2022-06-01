import { ProposalStatusProps } from 'Components/ProposalStatus/types';
import { Proposal } from 'types/types.guilds.d';
import { ENSAvatar } from '../Types';
import { DecodedAction } from 'old-components/Guilds/ActionsBuilder/types';

export interface ProposalCardProps {
  proposal?: Proposal;
  votes?: number[];
  ensAvatar?: ENSAvatar;
  href?: string;
  statusProps?: ProposalStatusProps;
  summaryActions?: DecodedAction[];
}
