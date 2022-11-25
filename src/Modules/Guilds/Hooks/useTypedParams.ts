import { useParams } from 'react-router-dom';

interface TypedParams {
  guildId: `0x${string}`;
  proposalId: `0x${string}`;
  proposalType: string;
  chainName: string;
}

export const useTypedParams = (): TypedParams => {
  const { guildId, proposalId, proposalType, chainName } = useParams<{
    guildId?: `0x${string}`;
    proposalId?: `0x${string}`;
    proposalType?: string;
    chainName?: string;
  }>();
  return {
    guildId,
    proposalId,
    proposalType,
    chainName,
  };
};
