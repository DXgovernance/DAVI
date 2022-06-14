import { useTypedParams } from '../Hooks/useTypedParams';
import ProposalCard from 'Components/ProposalCard/ProposalCard';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { Proposal } from 'types/types.guilds';
import useVoteSummary from 'hooks/Guilds/useVoteSummary';
import { MAINNET_ID } from 'utils/constants';
import { useProposalSummaryActions } from 'hooks/Guilds/guild/useProposalSummaryActions';
import useProposalState from 'hooks/Guilds/useProposalState';

interface ProposalCardWrapperProps {
  proposal?: Proposal;
}
const ProposalCardWrapper: React.FC<ProposalCardWrapperProps> = ({
  proposal,
}) => {
  const { guildId, chainName } = useTypedParams();
  const votes = useVoteSummary(guildId, proposal?.id);
  const summaryActions = useProposalSummaryActions(guildId, proposal?.id);

  const ensAvatar = useENSAvatar(proposal?.creator, MAINNET_ID);

  const status = useProposalState(proposal);
  return (
    <ProposalCard
      proposal={proposal}
      ensAvatar={ensAvatar}
      votes={votes}
      href={`/${chainName}/${guildId}/proposal/${proposal?.id}`}
      statusProps={{
        timeDetail: proposal?.timeDetail,
        status,
        endTime: proposal?.endTime,
      }}
      summaryActions={summaryActions}
    />
  );
};

export default ProposalCardWrapper;
