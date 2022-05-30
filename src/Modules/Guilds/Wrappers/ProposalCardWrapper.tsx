import { useTypedParams } from '../Hooks/useTypedParams';
import ProposalCard from 'Components/ProposalCard/ProposalCard';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { useProposal } from 'hooks/Guilds/ether-swr/guild/useProposal';
import useVoteSummary from 'hooks/Guilds/useVoteSummary';
import { MAINNET_ID } from 'utils/constants';
import { useMemo } from 'react';
import { ContractState } from 'Components/Types';
import { useProposalSummaryActions } from 'hooks/Guilds/guild/useProposalSummaryActions';
import moment from 'moment';

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

  // Make into hooks
  const timeDetail = useMemo(() => {
    if (!proposal?.endTime) return null;

    const currentTime = moment();
    if (proposal.endTime?.isBefore(currentTime)) {
      return proposal.endTime.toNow();
    } else {
      return proposal.endTime.fromNow();
    }
  }, [proposal]);

  // Make into singular guild state hook
  const status = useMemo(() => {
    debugger;
    if (!proposal?.endTime) return null;
    switch (proposal.contractState) {
      case ContractState.Active:
        const currentTime = moment();
        if (currentTime.isSameOrAfter(proposal.endTime)) {
          return ContractState.Failed;
        } else {
          return ContractState.Active;
        }
      case ContractState.Executed:
        return ContractState.Executed;
      case ContractState.Rejected:
        return ContractState.Rejected;
      case ContractState.Failed:
        return ContractState.Failed;
      default:
        return null;
    }
  }, [proposal]);

  return (
    <ProposalCard
      proposal={{ ...proposal, id: proposalId }}
      ensAvatar={ensAvatar}
      votes={votes}
      href={`/${chainName}/${guildId}/proposal/${proposalId}`}
      statusProps={{ timeDetail, status, endTime: proposal?.endTime }}
      summaryActions={summaryActions}
    />
  );
};

export default ProposalCardWrapper;
