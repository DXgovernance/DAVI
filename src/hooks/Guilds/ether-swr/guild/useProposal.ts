import { unix } from 'moment';
import { Middleware, SWRHook } from 'swr';
import { Proposal } from '../../../../types/types.guilds';
import useEtherSWR from '../useEtherSWR';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { ProposalState } from 'Components/Types';

const formatterMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    if (swr.data) {
      const original = swr.data as any;
      const clone: any = Object.assign({}, swr.data);

      switch (clone.state) {
        case 1:
          clone.state = [ProposalState.Active];
          break;
        case 2:
          clone.state = [ProposalState.Passed];
          break;
        case 3:
          clone.state = [ProposalState.Executed];
          break;
        case 4:
          clone.state = [ProposalState.Failed];
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
