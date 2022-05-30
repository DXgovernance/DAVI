import { useTransactions } from 'contexts/Guilds/transactions';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import moment from 'moment';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProposal } from '../ether-swr/guild/useProposal';

export enum ProposalState {
  Active = 'Active',
  Rejected = 'Rejected',
  Executed = 'Executed',
  Failed = 'Failed',
  Finished = 'Finished',
}

export enum ContractState {
  Active = 'Active',
  Rejected = 'Rejected',
  Executed = 'Executed',
  Failed = 'Failed',
}

interface useProposalStateReturns {
  data: {
    isExecutable: boolean;
    executeProposal: () => void;
  };
  error: Error;
  loading: boolean;
}

function useProposalState(): useProposalStateReturns {
  const { guildId, proposalId } =
    useParams<{ guildId?: string; proposalId?: string }>();
  const { data: proposal, error } = useProposal(guildId, proposalId);
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildId);

  debugger;
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
    const now = moment.unix(moment.now());

    return {
      data: {
        isExecutable:
          proposal.contractState === ContractState.Active &&
          proposal.endTime.isAfter(now),
        executeProposal: executeProposal,
      },
      loading: false,
      error: error,
    };
  }, [proposal]);

  return { data, error, loading };
}

export default useProposalState;
