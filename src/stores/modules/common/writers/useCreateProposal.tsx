import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useCallback } from 'react';
import { WriterHooksInteface } from 'stores/types';

type UseCreateProposalInterface = WriterHooksInteface['useCreateProposal'];

export const useCreateProposal: UseCreateProposalInterface = (
  daoId: string
) => {
  const guildContract = useERC20Guild(daoId);
  const { createTransaction } = useTransactions();

  const handleCreateProposal = useCallback(
    async (
      title: string,
      proposalData: any,
      cb: (error?: any, txtHash?: any) => void = null
    ) => {
      const { toArray, dataArray, valueArray, totalOptions, contentHash } =
        proposalData;

      createTransaction(
        `Create proposal ${title}`,
        async () => {
          return guildContract.createProposal(
            toArray,
            dataArray,
            valueArray,
            totalOptions,
            title,
            `${contentHash}`
          );
        },
        true,
        cb
      );
    },
    [guildContract, createTransaction]
  );

  return handleCreateProposal;
};
