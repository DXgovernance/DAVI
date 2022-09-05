import moment, { unix } from 'moment';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { Proposal, ContractState } from 'types/types.guilds.d';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

export const formatterMiddleware = (data): Proposal => {
  const clone = Object.assign({}, data);
  const ONE_MINUTE = 60000;

  //rename state to contractState
  clone.contractState = clone.state;
  delete clone.state;

  switch (clone.contractState) {
    case 1:
      clone.contractState = ContractState.Active;
      break;
    case 2:
      clone.contractState = ContractState.Rejected;
      break;
    case 3:
      clone.contractState = ContractState.Executed;
      break;
    case 4:
      clone.contractState = ContractState.Failed;
      break;
  }

  if (data.startTime instanceof BigNumber) {
    clone.startTime = data.startTime ? unix(data.startTime.toNumber()) : null;
  }
  if (data.endTime instanceof BigNumber) {
    clone.endTime = data.endTime ? unix(data.endTime.toNumber()) : null;
  }
  // Add timeDetail
  const currentTime = moment();
  let differenceInMilliseconds = currentTime.diff(clone.endTime);
  let timeDifference =
    Math.abs(differenceInMilliseconds) >= ONE_MINUTE
      ? moment.duration(differenceInMilliseconds).humanize()
      : 'a few seconds';
  if (clone.endTime.isBefore(currentTime)) {
    clone.timeDetail = `ended ${timeDifference} ago`;
  } else {
    clone.timeDetail = `${timeDifference} left`;
  }
  return clone;
};

export const useProposal = (guildId: string, proposalId: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildId,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'getProposal',
    args: [proposalId],
  });
  return {
    data: data ? formatterMiddleware({ ...data, id: proposalId }) : undefined,
    ...rest,
  };
};
