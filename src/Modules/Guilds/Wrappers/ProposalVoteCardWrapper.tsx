import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useProposal } from 'hooks/Guilds/ether-swr/guild/useProposal';
import useProposalMetadata from 'hooks/Guilds/ether-swr/guild/useProposalMetadata';
import useSnapshotId from 'hooks/Guilds/ether-swr/guild/useSnapshotId';
import { useVotingPowerOf } from 'hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import { useVotingResults } from 'hooks/Guilds/ether-swr/guild/useVotingResults';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import useTimedRerender from 'hooks/Guilds/time/useTimedRerender';
import { useWeb3React } from '@web3-react/core';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTransactions } from 'contexts/Guilds';
import { ProposalVoteCard } from 'Components/ProposalVoteCard';

const ProposalVoteCardWrapper = () => {
  const { guildId, proposalId } = useTypedParams();
  const { data: proposal } = useProposal(guildId, proposalId);
  const { data: proposalMetadata } = useProposalMetadata(guildId, proposalId);

  const voteData = useVotingResults();

  const timestamp = useTimedRerender(10000);

  const { account: userAddress } = useWeb3React();
  const { data: userVotingPower } = useVotingPowerOf({
    contractAddress: guildId,
    userAddress,
  });
  const { createTransaction } = useTransactions();
  const contract = useERC20Guild(guildId, true);
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

  const currentLockedPercent = useVotingPowerPercent(
    voteData?.quorum,
    voteData?.totalLocked
  );

  return (
    <ProposalVoteCard
      voteData={voteData}
      proposal={{ ...proposal, id: proposalId, metadata: proposalMetadata }}
      timestamp={timestamp}
      votingPower={{
        percent: votingPowerPercent,
        atSnapshot: votingPowerAtProposalSnapshot,
        atCurrentSnapshot: votingPowerAtProposalCurrentSnapshot,
        atProposal: userVotingPower,
      }}
      currentLockedPercent={currentLockedPercent}
      contract={contract}
      createTransaction={createTransaction}
    />
  );
};

export default ProposalVoteCardWrapper;
