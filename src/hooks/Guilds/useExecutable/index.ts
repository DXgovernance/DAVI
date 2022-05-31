import { useTransactions } from 'contexts/Guilds/transactions';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import moment from 'moment';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProposal } from '../ether-swr/guild/useProposal';
import { ContractState } from 'types/types.guilds.d';

interface useExecutableReturns {
  data: {
    isExecutable: boolean;
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
        data: { isExecutable: false, executeProposal: null },
        loading: true,
        error: error,
      };

    let result = {
      data: {
        isExecutable:
          proposal.contractState === ContractState.Active &&
          moment(moment.now()).isAfter(proposal.endTime),
        executeProposal: executeProposal,
      },
      loading: false,
      error: error,
    };

    return result;
  }, [proposal]);

  return { data, error, loading };
}

export default useExecutable;
