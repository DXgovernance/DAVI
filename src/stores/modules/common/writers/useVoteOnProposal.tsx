import { useTransactions } from 'contexts/Guilds';
import { BigNumber } from 'ethers';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useCallback } from 'react';
import { WriterHooksInteface } from 'stores/types';

type UseVoteOnProposalInterface = WriterHooksInteface['useVoteOnProposal'];

export const useVoteOnProposal: UseVoteOnProposalInterface = daoId => {
  const { createTransaction } = useTransactions();
  const daoContract = useERC20Guild(daoId, true);

  const voteOnProposal = useCallback(
    async (
      proposalId: string,
      option: BigNumber,
      votingPower: BigNumber,
      title: string = '',
      cb: (error?: any, txtHash?: any) => void = null
    ) => {
      createTransaction(
        `Vote on proposal${` ${title}` ?? ''}`,
        async () => daoContract.setVote(proposalId, option, votingPower),
        true,
        cb
      );
    },
    [daoContract, createTransaction]
  );

  return voteOnProposal;
};
