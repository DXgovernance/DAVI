import { ProposalInfoCardProps } from './types';
import { proposalMock, guildConfigMock } from 'Components/Fixtures';

export const fullParameters: ProposalInfoCardProps = {
  proposal: proposalMock,
  guildConfig: guildConfigMock,
  t: key => key,
  quorum: '0.3%',
};

export const loadingParameters: ProposalInfoCardProps = {
  proposal: null,
  guildConfig: null,
  t: key => key,
  quorum: null,
};
