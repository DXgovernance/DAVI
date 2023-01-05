import { useCallback } from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type UseVoteOnProposalInterface = WriterHooksInteface['useVoteOnProposal'];

export const useVoteOnProposal: UseVoteOnProposalInterface = (
  daoAddress: string
) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const daoContract = useERC20Guild(daoAddress, true);

  const voteOnProposal = useCallback(
    async (
      proposalId: string,
      option: BigNumber,
      votingPower: BigNumber,
      title: string = '',
      cb: (error?: any, txtHash?: any) => void = null
    ) => {
      createTransaction(
        `${t('voteOnProposal')}${` ${title}` ?? ''}`,
        async () => daoContract.setVote(proposalId, option, votingPower),
        true,
        cb
      );
    },
    [daoContract, createTransaction, t]
  );

  return voteOnProposal;
};
