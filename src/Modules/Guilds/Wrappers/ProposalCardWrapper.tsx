import { useTypedParams } from '../Hooks/useTypedParams';
import { ProposalCard } from 'components/ProposalCard';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import useProposal from 'Modules/Guilds/Hooks/useProposal';
import { MAINNET_ID } from 'utils/constants';
import useProposalState from 'hooks/Guilds/useProposalState';
import { useFilter } from 'contexts/Guilds/filters';
import useProposalCalls from 'Modules/Guilds/Hooks/useProposalCalls';
import { useAccount } from 'wagmi';
import useProposalVotesOfVoter from 'Modules/Guilds/Hooks/useProposalVotesOfVoter';
import useTimeDetail from 'Modules/Guilds/Hooks/useTimeDetail';
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
  const { address } = useAccount();
  const { data: proposalVotesOfVoter } = useProposalVotesOfVoter(
    guildId,
    proposalId,
    address
  );
  const endTime = useTimeDetail(guildId, status, proposal?.endTime);

  return withFilters(
    <ProposalCard
      proposal={{
        ...proposal,
        id: proposalId,
        votesOfVoter: proposalVotesOfVoter,
      }}
      ensAvatar={ensAvatar}
      href={
        proposalId ? `/${chainName}/${guildId}/proposal/${proposalId}` : null
      }
      statusProps={{
        status,
        endTime: endTime,
      }}
      options={options}
      address={address}
    />
  )(proposal, status, options);
};

export default ProposalCardWrapper;
