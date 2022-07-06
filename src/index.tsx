import App from './App';
import initializeI18Next from './i18n';
import GlobalErrorBoundary from './old-components/ErrorBoundary/GlobalErrorBoundary';
import * as serviceWorker from './serviceWorker';
import ThemeProvider from './theme';
import { Web3ReactProvider } from '@web3-react/core';
import moment from 'moment';
import EtherSWRManager from 'old-components/Guilds/EtherSWRManager';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from 'web3';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { chains, providers } from 'provider';
import { getConnectors } from 'provider/wallets';
import MultichainProvider from 'contexts/MultichainProvider';

const { provider, webSocketProvider } = configureChains(chains, providers);

const client = createClient({
  autoConnect: true,
  connectors: getConnectors(chains),
  provider,
  webSocketProvider,
});

initializeI18Next();

moment.updateLocale('en', {
  relativeTime: {
    s: '1 second',
    m: '1 minute',
    h: '1 hour',
    d: '1 day',
  },
});

function getLibrary(provider) {
  return new Web3(provider);
}

const Application = () => {
  return (
    <EtherSWRManager>
      <App />
    </EtherSWRManager>
  );
};

const Root = () => {
  return (
    <GlobalErrorBoundary>
      <WagmiConfig client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MultichainProvider>
            <ThemeProvider>
              <HashRouter>
                <Application />
              </HashRouter>
            </ThemeProvider>
          </MultichainProvider>
        </Web3ReactProvider>
      </WagmiConfig>
    </GlobalErrorBoundary>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
