import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type UseExecuteProposalInterface = WriterHooksInteface['useExecuteProposal'];

export const useExecuteProposal: UseExecuteProposalInterface = (
  daoId: string
) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const daoContract = useERC20Guild(daoId);

  const executeProposal = useCallback(
    async (proposalId: `0x${string}`) => {
      createTransaction(t('executeProposal'), async () => {
        return daoContract.endProposal(proposalId);
      });
    },
    [daoContract, createTransaction, t]
  );

  return executeProposal;
};
