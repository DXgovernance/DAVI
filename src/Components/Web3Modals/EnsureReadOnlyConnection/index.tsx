import { READ_ONLY_CONNECTOR_ID } from 'provider/ReadOnlyConnector';
import { useEffect, useMemo } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

const EnsureReadOnlyConnection = () => {
  const { chains } = useNetwork();
  const defaultChain = useMemo(() => {
    if (chains?.length === 0) return null;

    // Localhost is only available on development environments.
    // const localhost = chains.find(chain => chain.id === 1337);
    return chains[0];
  }, [chains]);

  const { connector, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnecting && !isReconnecting && !connector) {
      const readOnlyConnector = connectors.find(
        connector => connector.id === READ_ONLY_CONNECTOR_ID
      );
      if (readOnlyConnector) {
        console.log('Initiating read only connection');
        connect({ connector: readOnlyConnector, chainId: defaultChain?.id });
      }
    }
  }, [
    connect,
    isConnecting,
    isReconnecting,
    connector,
    connectors,
    defaultChain,
  ]);

  return null;
};

export default EnsureReadOnlyConnection;
