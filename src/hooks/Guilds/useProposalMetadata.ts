import useIPFSFile from 'hooks/Guilds/ipfs/useIPFSFile';
import { useContext, useMemo, useEffect, useState } from 'react';
import { ProposalMetadata } from 'types/types.guilds';
import contentHash from '@ensdomains/content-hash';
import useProposal from 'Modules/Guilds/Hooks/useProposal';
import { OrbisContext } from 'contexts/Guilds/orbis';

function useProposalMetadata(guildId: string, proposalId: `0x${string}`) {
  const { data: proposal, error } = useProposal(guildId, proposalId);
  const { orbis } = useContext(OrbisContext);
  const [orbisData, setOrbisData] = useState<any>();

  const { decodedContentHash, decodeError } = useMemo(() => {
    if (!proposal?.contentHash || proposal?.contentHash?.includes('://'))
      return {};

    try {
      return { decodedContentHash: contentHash.decode(proposal.contentHash) };
    } catch (e) {
      console.error(e);
      return { decodeError: e };
    }
  }, [proposal?.contentHash]);

  // Get orbis data
  useEffect(() => {
    let data;
    if (proposal?.contentHash?.startsWith('streamId://')) {
      const fetchData = async () => {
        data = await orbis.getPost(proposal?.contentHash.slice(11));
        if (data.status === 200) setOrbisData(data);
        else setOrbisData(data.error);
      };
      fetchData();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal?.contentHash]);

  const { data: metadata, error: metadataError } =
    useIPFSFile<ProposalMetadata>(decodedContentHash);

  if (orbisData) {
    return {
      data: {
        description: orbisData.data?.content?.body,
        voteOptions: orbisData.data?.content?.data.voteOptions,
        link: {
          master: orbisData.data?.master,
          context: orbisData.data?.context,
        },
      },
      error: undefined,
    };
  } else if (error || decodeError || metadataError) {
    return { error: error || decodeError || metadataError };
  } else if (!proposal || !metadata) {
    return { error: undefined, data: undefined };
  }

  return { data: metadata };
}

export default useProposalMetadata;
