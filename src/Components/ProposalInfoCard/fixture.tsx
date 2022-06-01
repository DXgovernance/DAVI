import { ProposalInfoCardProps } from './types';
import { proposalMock, guildConfigMock } from 'Components/Fixtures';

export const fullParameters: ProposalInfoCardProps = {
  proposal: proposalMock,
  guildConfig: guildConfigMock,
  t: key => key,
  quorum: '0.3%',
};
