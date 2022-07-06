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
  match?: (proposal, status, summaryActions) => boolean;
}
const ProposalCardWrapper: React.FC<ProposalCardWrapperProps> = ({
  proposalId,
  match,
}) => {
  const { guildId, chainName } = useTypedParams();
  const { data: proposal } = useProposal(guildId, proposalId);
  const votes = useVoteSummary(guildId, proposalId);
  const summaryActions = useProposalSummaryActions(guildId, proposalId);

  const ensAvatar = useENSAvatar(proposal?.creator, MAINNET_ID);

  const status = useProposalState(proposal);

  return (
    match(proposal, status, summaryActions) && (
      <ProposalCard
        proposal={{ ...proposal, id: proposalId }}
        ensAvatar={ensAvatar}
        votes={votes}
        href={
          proposalId ? `/${chainName}/${guildId}/proposal/${proposalId}` : null
        }
        statusProps={{
          timeDetail: proposal?.timeDetail,
          status,
          endTime: proposal?.endTime,
        }}
        summaryActions={summaryActions}
      />
    )
  );
};

ProposalCardWrapper.defaultProps = {
  match: () => true,
};

export default ProposalCardWrapper;
