import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'Components/Primitives/Modal';
import {
  BackIcon,
  ButtonContainer,
  ConnectionError,
  Container,
  TransactionsList,
  TransactionsListHeading,
} from './WalletModal.styled';
import { WalletModalProps } from './types';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { Option, Transaction, WalletInfoBox } from '../components';
import { getIcon, isReadOnly } from 'provider/wallets';
import { useTransactions } from 'contexts/Guilds';
import { Divider } from 'old-components/Guilds/common/Divider';
import { Button } from 'old-components/Guilds/common/Button';
import { READ_ONLY_CONNECTOR_ID } from 'provider/ReadOnlyConnector';

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isWalletListActive, setIsWalletsListActive] = useState(false);
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { transactions, clearAllTransactions } = useTransactions();
  const { disconnect } = useDisconnect();
  const {
    connector: activeConnector,
    isConnecting,
    isConnected,
  } = useAccount();
  const { connectors, connect, error: connectionError } = useConnect();

  function getOptions() {
    return connectors
      .filter(connector => connector.id !== READ_ONLY_CONNECTOR_ID)
      .map(connector => {
        return (
          <Option
            dataTestId={`wallet-option-${connector.id}`}
            disabled={!connector.ready}
            key={connector.id}
            onClick={() =>
              activeConnector !== connector && connect({ connector })
            }
            icon={getIcon(connector.id, connector.name)}
            header={connector.name}
            active={activeConnector === connector && isConnected}
            loading={activeConnector === connector && isConnecting}
          />
        );
      });
  }

  function getModalContent() {
    if (isConnected && chain.unsupported) {
      return <Container>{t('pleaseSwitchNetwork')}</Container>;
    }

    if (!isConnected || isWalletListActive || isReadOnly(activeConnector)) {
      return (
        <Container>
          {getOptions()}

          {connectionError && (
            <ConnectionError>{connectionError.message}</ConnectionError>
          )}
        </Container>
      );
    }

    const recentTransactions =
      transactions &&
      transactions
        .sort((tx1, tx2) => tx2.addedTime - tx1.addedTime)
        .slice(0, 5);
    return (
      <>
        <WalletInfoBox openOptions={() => setIsWalletsListActive(true)} />
        <Divider />
        <TransactionsList>
          {recentTransactions?.length === 0 ? (
            <TransactionsListHeading>
              {t('yourTransactionsWillAppearHere')}
            </TransactionsListHeading>
          ) : (
            <>
              <TransactionsListHeading>
                {t('recentTransactions')}
              </TransactionsListHeading>
              <Divider />
              {recentTransactions?.map(transaction => (
                <Transaction transaction={transaction} key={transaction.hash} />
              ))}
              {recentTransactions?.length > 0 && (
                <ButtonContainer>
                  <Button onClick={clearAllTransactions}>
                    {t('clearAll')}
                  </Button>
                </ButtonContainer>
              )}
            </>
          )}
        </TransactionsList>
      </>
    );
  }

  const getHeader = () => {
    if (isConnected && chain.unsupported) {
      return t('unsupportedNetwork');
    }

    if (isConnected && isWalletListActive && !isReadOnly(activeConnector)) {
      return (
        <BackIcon
          onClick={() => {
            setIsWalletsListActive(false);
          }}
        />
      );
    }

    return isConnected && !isReadOnly(activeConnector)
      ? t('account')
      : t('connectToAWallet');
  };

  const getPrimaryAction = () => {
    if (isConnected && isWalletListActive && !isReadOnly(activeConnector))
      return () => disconnect();

    if (isConnected && chain.unsupported && switchNetwork) {
      const firstSupported = chains && chains?.length > 0 ? chains[0] : null;
      return () => switchNetwork(firstSupported.id);
    }

    return null;
  };

  const getPrimaryActionLabel = () => {
    if (isConnected && isWalletListActive && !isReadOnly(activeConnector))
      return t('disconnect');

    if (isConnected && chain.unsupported) {
      const firstSupported = chains && chains?.length > 0 ? chains[0] : null;

      return t('switchNetworkTo', { chainName: firstSupported?.name });
    }

    return null;
  };

  return (
    <Modal
      dataTestId="wallet-modal"
      header={getHeader()}
      isOpen={isOpen}
      onDismiss={onClose}
      onConfirm={getPrimaryAction()}
      confirmText={getPrimaryActionLabel()}
      maxWidth={450}
    >
      {getModalContent()}
    </Modal>
  );
};

export default WalletModal;
