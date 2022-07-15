import { SwitchNetworkArgs } from '@wagmi/core';
import {
  Chain,
  useAccount,
  useSwitchNetwork as useSwitchNetworkWagmi,
} from 'wagmi';
import { UseSwitchNetworkConfig } from 'wagmi/dist/declarations/src/hooks/accounts/useSwitchNetwork';
import useHash from '../useHash';

const useSwitchNetwork = ({
  onSuccess,
  ...args
}: Partial<SwitchNetworkArgs> & UseSwitchNetworkConfig = {}) => {
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

    onSuccess(chain, variables, context);
  }

  return switchNetworkResult;
};

export default useSwitchNetwork;
