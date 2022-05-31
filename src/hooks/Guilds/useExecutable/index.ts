import { useTransactions } from 'contexts/Guilds/transactions';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProposal } from '../ether-swr/guild/useProposal';

interface useExecutableReturns {
  data: {
    executeProposal: () => void;
  };
  error: Error;
  loading: boolean;
}

function useExecutable(): useExecutableReturns {
  const { guildId, proposalId } =
    useParams<{ guildId?: string; proposalId?: string }>();
  const { data: proposal, error } = useProposal(guildId, proposalId);
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildId);

  const executeProposal = () =>
    createTransaction('Execute Proposal', async () => {
      return guildContract.endProposal(proposalId);
    });

  const { data, loading } = useMemo(() => {
    if (!proposal)
      return {
        data: { executeProposal: null },
        loading: true,
        error: error,
      };

    let result = {
      data: { executeProposal },
      loading: false,
      error: error,
    };

    return result;
  }, [proposal]);

  return { data, error, loading };
}

export default useExecutable;
