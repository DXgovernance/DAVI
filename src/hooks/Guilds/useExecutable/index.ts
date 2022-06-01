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

  const { data, loading } = useMemo(() => {
    const executeProposal = () =>
      createTransaction('Execute Proposal', async () => {
        return guildContract.endProposal(proposalId);
      });

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
  }, [createTransaction, error, guildContract, proposal, proposalId]);

  return { data, error, loading };
}

export default useExecutable;
