import { EtherSWRConfig } from 'ether-swr';
import loggerMiddleware from 'hooks/Guilds/ether-swr/middleware/logger';
import { useProvider } from 'wagmi';

const EtherSWRManager: React.FC = ({ children }) => {
  const provider = useProvider();

  return (
    <EtherSWRConfig
      value={{
        web3Provider: provider,
        refreshInterval: 30000,
        use: [loggerMiddleware],
      }}
    >
      {children}
    </EtherSWRConfig>
  );
};

export default EtherSWRManager;
