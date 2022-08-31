import { READ_ONLY_CONNECTOR_ID } from 'provider/ReadOnlyConnector';
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';

const EnsureReadOnlyConnection = () => {
  const { chain } = useNetwork();

  const [latestWorkingNetwork, setLatestWorkingNetwork] = useState(null);
  useEffect(() => {
    if (chain) setLatestWorkingNetwork(chain);
  }, [chain]);

  const { connector, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnecting && !isReconnecting && !connector) {
      const readOnlyConnector = connectors.find(
        connector => connector.id === READ_ONLY_CONNECTOR_ID
      );
      if (readOnlyConnector) {
        console.log('Initiating read only connection');
        connect({
          connector: readOnlyConnector,
          chainId: latestWorkingNetwork?.id,
        });
      }
    }
  }, [
    connect,
    isConnecting,
    isReconnecting,
    connector,
    connectors,
    latestWorkingNetwork,
  ]);
  return null;
};

export default EnsureReadOnlyConnection;
