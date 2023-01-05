import { useParams } from 'react-router-dom';

interface TypedParams {
  guildId: `0x${string}`;
  proposalId: `0x${string}`;
  discussionId: `${string}`;
  proposalType: string;
  chainName: string;
}

export const useTypedParams = (): TypedParams => {
  const { guildId, proposalId, discussionId, proposalType, chainName } =
    useParams<{
      guildId?: `0x${string}`;
      proposalId?: `0x${string}`;
      discussionId?: `${string}`;
      proposalType?: string;
      chainName?: string;
    }>();
  return {
    guildId,
    proposalId,
    discussionId,
    proposalType,
    chainName,
  };
};
