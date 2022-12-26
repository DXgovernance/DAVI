import useIPFSFile from 'hooks/Guilds/ipfs/useIPFSFile';
import { useMemo } from 'react';
import { ProposalMetadata } from 'types/types.guilds';
import contentHash from '@ensdomains/content-hash';
import { useHookStoreProvider } from 'stores';

function useProposalMetadata(guildId: string, proposalId: `0x${string}`) {
  const {
    hooks: {
      fetchers: { useProposal },
    },
  } = useHookStoreProvider();
  const { data: proposal, error } = useProposal(guildId, proposalId);

  const { decodedContentHash, decodeError } = useMemo(() => {
    if (!proposal?.contentHash) return {};

    try {
      return { decodedContentHash: contentHash.decode(proposal.contentHash) };
    } catch (e) {
      console.error(e);
      return { decodeError: e };
    }
  }, [proposal]);

  const { data: metadata, error: metadataError } =
    useIPFSFile<ProposalMetadata>(decodedContentHash);

  if (error || decodeError || metadataError) {
    return { error: error || decodeError || metadataError };
  } else if (!proposal || !metadata) {
    return { error: undefined, data: undefined };
  }

  return { data: metadata };
}

export default useProposalMetadata;
