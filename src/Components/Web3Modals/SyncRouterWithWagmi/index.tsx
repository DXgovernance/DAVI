import useHash from 'hooks/Guilds/useHash';
import useSwitchNetwork from 'hooks/Guilds/web3/useSwitchNetwork';
import { isReadOnly } from 'provider/wallets';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

interface SyncRouterWithWagmiProps {
  children: React.ReactElement;
}

const SyncRouterWithWagmi: React.FC<SyncRouterWithWagmiProps> = ({
  children,
}) => {
  const { connector } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain, chains } = useNetwork();
  const [hash, setHash] = useHash();

  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

  const defaultChain = useMemo(() => {
    if (chains?.length === 0) return null;

    // Localhost is only available on development environments.
    const localhost = chains.find(chain => chain.id === 1337);
    return localhost || chains[0];
  }, [chains]);

  const urlChain = useMemo(() => {
    const urlChain = chains.find(chain => hash.includes(chain.network));
    return urlChain;
  }, [chains, hash]);

  // Handle initial load
  useEffect(() => {
    if (isInitialLoadDone) return;

    if (connector) {
      // Connector initialized.

      if (urlChain && urlChain?.id === chain?.id) {
        // No chain name in the URL. Nothing to do here.
        setIsInitialLoadDone(true);
        return;
      }

      const chainToConnect = urlChain || defaultChain;
      if (isReadOnly(connector)) {
        // We're connected to the network connector. Switch to the correct chain.
        switchNetworkAsync(chainToConnect.id).then(() =>
          setIsInitialLoadDone(true)
        );
      } else {
        // We're connected to a connector on a different chain. Disconnect and switch to the correct chain.
        const readOnlyConnector = connectors.find(isReadOnly);
        connectAsync({
          connector: readOnlyConnector,
          chainId: chainToConnect.id,
        }).then(() => setIsInitialLoadDone(true));
      }
    }
  }, [
    isInitialLoadDone,
    connector,
    urlChain,
    switchNetworkAsync,
    connectAsync,
    chains,
    chain,
    connectors,
    defaultChain,
  ]);

  // Keep the URL in sync with the connected chain after initial load
  useEffect(() => {
    if (!isInitialLoadDone) return;

    if (chain && (!urlChain || urlChain?.id !== chain?.id)) {
      const url = `/${chain.network}`;
      setHash(url);
    }
  }, [isInitialLoadDone, chain, urlChain, setHash]);

  return isInitialLoadDone ? children : null;
};

export default SyncRouterWithWagmi;
