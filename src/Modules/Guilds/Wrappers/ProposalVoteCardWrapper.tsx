import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import useProposal from 'Modules/Guilds/Hooks/useProposal';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import { useVotingPowerOf } from 'Modules/Guilds/Hooks/useVotingPowerOf';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import useTimedRerender from 'hooks/Guilds/time/useTimedRerender';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { ProposalVoteCard } from 'components/ProposalVoteCard';
import { useTransactions } from 'contexts/Guilds';
import { useAccount } from 'wagmi';
import useProposalVotesOfVoter from 'Modules/Guilds/Hooks/useProposalVotesOfVoter';
import useTotalLocked from '../Hooks/useTotalLocked';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useGuildConfig } from '../Hooks/useGuildConfig';
const ProposalVoteCardWrapper = () => {
  const { guildId, proposalId } = useTypedParams();
  const { address: userAddress } = useAccount();
  const { data: proposal } = useProposal(guildId, proposalId);
  const { data: proposalMetadata } = useProposalMetadata(guildId, proposalId);
  const { data: userVote } = useProposalVotesOfVoter(
    guildId,
    proposalId,
    userAddress
  );
  const { data } = useGuildConfig(guildId);
  const timestamp = useTimedRerender(10000);

  const { data: userVotingPower } = useVotingPowerOf({
    contractAddress: guildId,
    userAddress,
  });
  const contract = useERC20Guild(guildId, true);
  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildId,
    proposalId,
  });
  const { data: totalLocked } = useTotalLocked(guildId, snapshotId?.toString());
  const { data: tokenInfo } = useERC20Info(data?.token);

  const { createTransaction } = useTransactions();

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
    totalLocked
  );

  return (
    <ProposalVoteCard
      voteData={{
        totalLocked,
        quorum: data?.votingPowerForProposalExecution,
        token: tokenInfo,
      }}
      proposal={{ ...proposal, id: proposalId, metadata: proposalMetadata }}
      timestamp={timestamp}
      votingPower={{
        userVotingPower,
        percent: votingPowerPercent,
        atSnapshot: votingPowerAtProposalSnapshot,
        atCurrentSnapshot: votingPowerAtProposalCurrentSnapshot,
      }}
      contract={contract}
      createTransaction={createTransaction}
      userVote={userVote}
    />
  );
};

export default ProposalVoteCardWrapper;
