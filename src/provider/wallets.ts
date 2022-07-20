import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Chain, Connector } from 'wagmi';
import metamaskIcon from 'assets/images/metamask.png';
import walletConnectIcon from 'assets/images/walletconnect.png';
import coinbaseWalletIcon from 'assets/images/coinbaseWallet.png';
import frameIcon from 'assets/images/frame.svg';
import { ReadOnlyConnector, READ_ONLY_CONNECTOR_ID } from './ReadOnlyConnector';

const getInjected = (chains: Chain[]) =>
  new InjectedConnector({
    chains,
    options: {
      shimChainChangedDisconnect: true,
      name(detectedName) {
        return detectedName
          ? typeof detectedName === 'string'
            ? detectedName
            : detectedName.join(', ')
          : 'Browser Wallet';
      },
    },
  });

const getWalletConnect = (chains: Chain[]) =>
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  });

const getCoinbaseWallet = (chains: Chain[]) =>
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'DAVI',
      darkMode: true,
    },
  });

const getReadOnly = (chains: Chain[]) =>
  new ReadOnlyConnector({
    chains,
    options: {
      name: 'Read Only',
    },
  });

export const getConnectors = (chains: Chain[]) => [
  getInjected(chains),
  getWalletConnect(chains),
  getCoinbaseWallet(chains),
  getReadOnly(chains),
];

export const getIcon = (connectorId: string, walletName: string) => {
  switch (connectorId) {
    case 'injected': {
      if (walletName === 'MetaMask') {
        return metamaskIcon;
      } else if (walletName === 'Frame') {
        return frameIcon;
      } else {
        return null;
      }
    }
    case 'walletConnect': {
      return walletConnectIcon;
    }
    case 'coinbaseWallet': {
      return coinbaseWalletIcon;
    }
    default: {
      return null;
    }
  }
};

export const isReadOnly = (connector: Connector) => {
  return !connector || connector.id === READ_ONLY_CONNECTOR_ID;
};
