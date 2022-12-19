import useIPFSFile from 'hooks/Guilds/ipfs/useIPFSFile';
import { ProposalMetadata } from 'types/types.guilds';
import useProposal from 'Modules/Guilds/Hooks/useProposal';

function useProposalMetadata(guildId: string, proposalId: string) {
  const { data: proposal, error } = useProposal(guildId, proposalId);
  // Don't support hashed cid anymore

  const { data: metadata, error: metadataError } =
    useIPFSFile<ProposalMetadata>(
      proposal?.contentHash?.substring(7, proposal?.contentHash?.length + 1)
    );

  if (error || metadataError) {
    return { error: error || metadataError };
  } else if (!proposal || !metadata) {
    return { error: undefined, data: undefined };
  }

  return { data: metadata };
}

export default useProposalMetadata;
