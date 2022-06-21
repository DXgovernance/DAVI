import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';

import { usePrevious } from 'utils';
import { injected, getWallets, isChainIdSupported } from 'provider/connectors';
import { useRpcUrls } from 'provider/providerHooks';
import { Modal } from 'Components';
import { Button } from 'old-components/Guilds/common/Button';
import { useTransactions } from '../../../contexts/Guilds';
import { Divider } from 'old-components/Guilds/common/Divider';

import { Option, WalletInfoBox, Transaction } from '../components';

import {
  Container,
  ErrorHeading,
  BackIcon,
  ButtonContainer,
  TransactionsList,
  TransactionsListHeading,
} from './WalletModal.styled';
import { WalletModalProps } from './types';

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { active, connector, error, activate, account, chainId } =
    useWeb3React();
  const rpcUrls = useRpcUrls();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const [connectionErrorMessage, setConnectionErrorMessage] = useState(false);
  const { transactions, clearAllTransactions } = useTransactions();

  // always reset to account view
  useEffect(() => {
    if (isOpen) {
      setConnectionErrorMessage(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [isOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (
      isOpen &&
      ((active && !activePrevious) ||
        (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [
    setWalletView,
    active,
    error,
    connector,
    activePrevious,
    connectorPrevious,
    isOpen,
  ]);

  const tryActivation = async connector => {
    setWalletView(WALLET_VIEWS.PENDING);
    activate(connector, undefined, true).catch(e => {
      setConnectionErrorMessage(e);
      console.debug('[Activation Error]', e);
    });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    if (!rpcUrls) return [];

    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    const wallets = getWallets(rpcUrls);
    return Object.keys(wallets).map(key => {
      const option = wallets[key];
      // check for mobile options
      if (isMobile) {
        if (!window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector);
              }}
              key={key}
              icon={option.icon}
              active={option.connector && option.connector === connector}
              link={option.href}
              header={option.name}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!window.ethereum) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                key={key}
                icon={option.icon}
                header={t('installMetamask')}
                link={'https://metamask.io/'}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            icon={option.icon}
            link={option.href}
            header={option.name}
            dataTestId={`wallet-option-${option.name}`}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (connectionErrorMessage) {
      const isUnsupportedChain =
        connectionErrorMessage.toString().indexOf('UnsupportedChainIdError') >=
        0;
      return (
        <Container>
          <ErrorHeading size={2}>
            {isUnsupportedChain ? t('wrongNetwork') : t('errorConnecting')}
          </ErrorHeading>
          <div>
            {isUnsupportedChain
              ? t('pleaseConnectToAValidEthNetwork')
              : `${t('errorConnecting')}. ${t('tryRefreshingThePage')}`}
          </div>
        </Container>
      );
    }

    if (
      account &&
      !isChainIdSupported(chainId) &&
      walletView === WALLET_VIEWS.ACCOUNT
    ) {
      return (
        <Container>
          <ErrorHeading size={2}>{t('wrongNetwork')}</ErrorHeading>
          <div>{t('pleaseConnectToAValidEthNetwork')}.</div>
        </Container>
      );
    }

    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      const recentTransactions =
        transactions &&
        transactions
          .sort((tx1, tx2) => tx2.addedTime - tx1.addedTime)
          .slice(0, 5);
      return (
        <>
          <WalletInfoBox
            openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
          />
          <Divider />
          <TransactionsList>
            {recentTransactions?.length === 0 ? (
              <TransactionsListHeading>
                {t('yourTransactionsWillAppearHere')}...
              </TransactionsListHeading>
            ) : (
              <>
                <TransactionsListHeading>
                  {t('recentTransactions')}
                </TransactionsListHeading>
                <Divider />
                {recentTransactions?.map(transaction => (
                  <Transaction
                    transaction={transaction}
                    key={transaction.hash}
                  />
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

    return <Container>{getOptions()}</Container>;
  }

  const getHeader = () => {
    if (walletView !== WALLET_VIEWS.ACCOUNT) {
      return (
        <BackIcon
          onClick={() => {
            setWalletView(WALLET_VIEWS.ACCOUNT);
          }}
        />
      );
    }

    if (walletView === WALLET_VIEWS.ACCOUNT) return t('account');

    return t('connectToAWallet');
  };

  return (
    <Modal
      dataTestId="wallet-modal"
      header={getHeader()}
      isOpen={isOpen}
      onDismiss={onClose}
      maxWidth={380}
    >
      {getModalContent()}
    </Modal>
  );
};

export default WalletModal;
