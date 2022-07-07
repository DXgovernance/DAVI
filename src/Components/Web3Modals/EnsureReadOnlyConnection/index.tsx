import { READ_ONLY_CONNECTOR_ID } from 'provider/ReadOnlyConnector';
import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

const EnsureReadOnlyConnection = () => {
  const { connector, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnecting && !isReconnecting && !connector) {
      const readOnlyConnector = connectors.find(
        connector => connector.id === READ_ONLY_CONNECTOR_ID
      );
      if (readOnlyConnector) {
        console.log('Initiating read only connection');
        connect({ connector: readOnlyConnector });
      }
    }
  }, [connect, isConnecting, isReconnecting, connector, connectors]);

  return null;
};

export default EnsureReadOnlyConnection;
