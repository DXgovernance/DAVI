import { useTypedParams } from '../Hooks/useTypedParams';
import ProposalCard from 'Components/ProposalCard/ProposalCard';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { useProposal } from 'hooks/Guilds/ether-swr/guild/useProposal';
import useVoteSummary from 'hooks/Guilds/useVoteSummary';
import { MAINNET_ID } from 'utils/constants';
import { useProposalSummaryActions } from 'hooks/Guilds/guild/useProposalSummaryActions';
import useProposalState from 'hooks/Guilds/useProposalState';

interface ProposalCardWrapperProps {
  proposalId?: string;
}
const ProposalCardWrapper: React.FC<ProposalCardWrapperProps> = ({
  proposalId,
}) => {
  const { guildId, chainName } = useTypedParams();
  const { data: proposal } = useProposal(guildId, proposalId);
  const votes = useVoteSummary(guildId, proposalId);
  const summaryActions = useProposalSummaryActions(guildId, proposalId);

  const ensAvatar = useENSAvatar(proposal?.creator, MAINNET_ID);

  const status = useProposalState(proposal);
  return (
    <ProposalCard
      proposal={{ ...proposal, id: proposalId }}
      ensAvatar={ensAvatar}
      votes={votes}
      href={`/${chainName}/${guildId}/proposal/${proposalId}`}
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
