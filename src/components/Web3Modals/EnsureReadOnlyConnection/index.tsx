import { READ_ONLY_CONNECTOR_ID } from 'provider/ReadOnlyConnector';
import { useEffect, useMemo } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

const EnsureReadOnlyConnection = () => {
  const { chains, chain } = useNetwork();
  const validChain = useMemo(() => {
    if (chains?.length === 0) return null;
    if (!chain) return chains[0];
    return chain;
  }, [chains, chain]);

  const { connector, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnecting && !isReconnecting && !connector) {
      const readOnlyConnector = connectors.find(
        connector => connector.id === READ_ONLY_CONNECTOR_ID
      );
      if (readOnlyConnector) {
        console.log('Initiating read only connection');
        connect({ connector: readOnlyConnector, chainId: validChain?.id });
      }
    }
  }, [
    connect,
    isConnecting,
    isReconnecting,
    connector,
    connectors,
    validChain,
  ]);

  return null;
};

export default EnsureReadOnlyConnection;
