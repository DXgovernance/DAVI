import { EtherSWRConfig } from 'ether-swr';
import loggerMiddleware from 'hooks/Guilds/ether-swr/middleware/logger';
import { useProvider } from 'wagmi';

interface EtherSWRManagerProps {
  children: JSX.Element;
}

export const EtherSWRManager: React.FC<EtherSWRManagerProps> = ({
  children,
}) => {
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
