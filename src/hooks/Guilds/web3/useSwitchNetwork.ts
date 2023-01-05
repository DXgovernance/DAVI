import { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core';
import { UseMutationOptions } from '@tanstack/react-query';
import {
  Chain,
  useAccount,
  useSwitchNetwork as useSwitchNetworkWagmi,
} from 'wagmi';
import useHash from '../useHash';

declare type MutationConfig<Data, Error, Variables = void> = {
  onError?: UseMutationOptions<Data, Error, Variables>['onError'];
  onMutate?: UseMutationOptions<Data, Error, Variables>['onMutate'];
  onSettled?: UseMutationOptions<Data, Error, Variables>['onSettled'];
  onSuccess?: UseMutationOptions<Data, Error, Variables>['onSuccess'];
};

const useSwitchNetwork = ({
  onSuccess,
  ...args
}: Partial<SwitchNetworkArgs> &
  MutationConfig<SwitchNetworkResult, Error, SwitchNetworkArgs> & {
    throwForSwitchChainNotSupported?: boolean;
  } = {}) => {
  const { connector } = useAccount();
  const switchNetworkResult = useSwitchNetworkWagmi({
    ...args,
    onSuccess: onSwitchSuccess,
  });
  const [, setHash] = useHash();

  function onSwitchSuccess(
    chain: Chain,
    variables: SwitchNetworkArgs,
    context: unknown
  ) {
    // Frame has a bug where it doesn't switch networks properly when changing the hash.
    if (
      connector &&
      connector.id === 'injected' &&
      connector.name === 'Frame'
    ) {
      setHash(`/${chain.network}`);
      window.location.reload();
    }

    onSuccess && onSuccess(chain, variables, context);
  }

  return switchNetworkResult;
};

export default useSwitchNetwork;
