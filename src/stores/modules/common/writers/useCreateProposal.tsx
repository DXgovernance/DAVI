import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

export const useCreateProposal = (daoContractAdress: string) => {
  const guildContract = useERC20Guild(daoContractAdress);
  const { createTransaction } = useTransactions();

  const handleCreateProposal = async (
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
  };

  return handleCreateProposal;
};
