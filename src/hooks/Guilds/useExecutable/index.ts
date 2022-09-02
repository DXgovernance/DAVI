import { useTransactions } from 'contexts/Guilds/transactions';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useMemo } from 'react';
import { useProposal } from 'Modules/Guilds/Hooks/useProposal';

interface useExecutableReturns {
  data: {
    executeProposal: () => void;
  };
  error: Error;
  loading: boolean;
}

function useExecutable(): useExecutableReturns {
  const { guildId, proposalId } = useTypedParams();
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
