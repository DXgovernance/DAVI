import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import { useVotingPowerOf } from 'Modules/Guilds/Hooks/useVotingPowerOf';
import { useVotingResults } from 'Modules/Guilds/Hooks/useVotingResults';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import useTimedRerender from 'hooks/Guilds/time/useTimedRerender';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { ProposalVoteCard } from 'components/ProposalVoteCard';
import { useAccount } from 'wagmi';
import useProposalVotesOfVoter from 'Modules/Guilds/Hooks/useProposalVotesOfVoter';
import useGuildImplementationTypeConfig from '../Hooks/useGuildImplementationType';
import { useHookStoreProvider } from 'stores';

const ProposalVoteCardWrapper = () => {
  const {
    hooks: {
      fetchers: { useProposal, useSnapshotId },
    },
  } = useHookStoreProvider();
  const { guildId, proposalId } = useTypedParams();
  const { address: userAddress } = useAccount();
  const { data: proposal } = useProposal(guildId, proposalId);
  const { data: proposalMetadata } = useProposalMetadata(guildId, proposalId);
  const voteData = useVotingResults();
  const { data: userVote } = useProposalVotesOfVoter(
    guildId,
    proposalId,
    userAddress
  );

  const timestamp = useTimedRerender(10000);

  const { isSnapshotGuild } = useGuildImplementationTypeConfig(guildId);

  const { data: userVotingPower } = useVotingPowerOf({
    contractAddress: guildId,
    userAddress,
  });
  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildId,
    proposalId,
  });

  // Get voting power without fallbackSnapshotId
  const { data: votingPowerAtProposalSnapshot } = useVotingPowerOf({
    contractAddress: guildId,
    userAddress: userAddress,
    snapshotId: snapshotId?.toString(),
    fallbackSnapshotId: false,
  });

  // Get voting power at current snapshotId
  const { data: votingPowerAtProposalCurrentSnapshot } = useVotingPowerOf({
    contractAddress: guildId,
    userAddress: userAddress,
    snapshotId: null,
    fallbackSnapshotId: true,
  });

  const votingPowerPercent = useVotingPowerPercent(
    votingPowerAtProposalSnapshot,
    voteData?.totalLocked
  );

  return (
    <ProposalVoteCard
      voteData={voteData}
      proposal={{ ...proposal, id: proposalId, metadata: proposalMetadata }}
      timestamp={timestamp}
      votingPower={{
        userVotingPower: isSnapshotGuild
          ? votingPowerAtProposalSnapshot
          : userVotingPower,
        percent: votingPowerPercent,
        atCurrentSnapshot: votingPowerAtProposalCurrentSnapshot,
      }}
      userVote={userVote}
      votingMachineAddress={guildId}
    />
  );
};

export default ProposalVoteCardWrapper;
