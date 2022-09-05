import { useMemo } from 'react';
import { useTypedParams } from '../Hooks/useTypedParams';
import { ProposalCard } from 'components/ProposalCard';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { useProposal } from 'Modules/Guilds/Hooks/useProposal';
import { MAINNET_ID } from 'utils/constants';
import useProposalState from 'hooks/Guilds/useProposalState';
import { useFilter } from 'contexts/Guilds/filters';
import useProposalCalls from 'Modules/Guilds/Hooks/useProposalCalls';

interface ProposalCardWrapperProps {
  proposalId?: string;
}
const ProposalCardWrapper: React.FC<ProposalCardWrapperProps> = ({
  proposalId,
}) => {
  const { guildId, chainName } = useTypedParams();
  const { data: proposal } = useProposal(guildId, proposalId);
  const ensAvatar = useENSAvatar(proposal?.creator, MAINNET_ID);
  const status = useProposalState(proposal);
  const { withFilters } = useFilter();
  const { options } = useProposalCalls(guildId, proposalId);

  const sortedOptionsByWinningVotes = useMemo(() => {
    if (options) {
      const sortedOptionsByWiningVote: any = options?.sort((a, b) => {
        const aVotes = a.totalVotes?.toBigInt();
        const bVotes = b.totalVotes?.toBigInt();
        if (aVotes === bVotes) return 0;
        if (aVotes < bVotes) return 1;
        return -1;
      });
      return sortedOptionsByWiningVote;
    } else {
      return [];
    }
  }, [options]);

  return withFilters(
    <ProposalCard
      proposal={{ ...proposal, id: proposalId }}
      ensAvatar={ensAvatar}
      href={
        proposalId ? `/${chainName}/${guildId}/proposal/${proposalId}` : null
      }
      statusProps={{
        timeDetail: proposal?.timeDetail,
        status,
        endTime: proposal?.endTime,
        guildId: guildId,
      }}
      options={sortedOptionsByWinningVotes}
    />
  )(proposal, status, options);
};

export default ProposalCardWrapper;
