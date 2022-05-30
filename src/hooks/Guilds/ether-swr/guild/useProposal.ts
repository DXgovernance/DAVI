import { unix } from 'moment';
import { Middleware, SWRHook } from 'swr';
import { Proposal } from '../../../../types/types.guilds';
import useEtherSWR from '../useEtherSWR';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { ContractState } from 'Components/Types';

const formatterMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    if (swr.data) {
      const original = swr.data as any;
      const clone: any = Object.assign({}, swr.data);

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

      clone.startTime = original.startTime
        ? unix(original.startTime.toNumber())
        : null;
      clone.endTime = original.endTime
        ? unix(original.endTime.toNumber())
        : null;

      return { ...swr, data: clone };
    }
    return swr;
  };

export const useProposal = (guildId: string, proposalId: string) => {
  let result = useEtherSWR<Proposal>(
    guildId && proposalId ? [guildId, 'getProposal', proposalId] : [],
    {
      use: [formatterMiddleware],
      ABIs: new Map([[guildId, ERC20GuildContract.abi]]),
    }
  );
  return result;
};
