import GlobalErrorBoundary from './old-components/Guilds/ErrorBoundary/GlobalErrorBoundary';
import { Header } from 'Components';
import ToastNotificationContainer from './old-components/Guilds/ToastNotifications/ToastNotificationContainer';
import { Container } from './Components/Primitives/Layout';
import GuildsPage from './Modules/Guilds/pages/Guilds';
import ProposalPage from './Modules/Guilds/pages/Proposal';
import GlobalStyle from './theme/GlobalTheme';
import { ProposalTypesConfig } from 'configs/proposalTypes';
import { GuildsContextProvider, TransactionsProvider } from 'contexts/Guilds';
import GuildAvailabilityProvider from 'contexts/Guilds/guildAvailability';
import { ProposalTypes } from 'Components/ProposalTypes';
import CreateProposalPage from 'Modules/Guilds/pages/CreateProposal';
import LandingPage from 'Modules/Guilds/pages/LandingPage';
import NotFound from 'Modules/Guilds/pages/NotFound';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GuildsDarkTheme } from 'Components/theme';
import { useMemo } from 'react';
import { useNetwork } from 'wagmi';

const App = () => {
  const { chains } = useNetwork();
  const defaultChain = useMemo(() => {
    const first = chains[0].network;
    const isDev = process.env.NODE_ENV === 'development';
    return isDev ? 'localhost' : first;
  }, [chains]);

  return (
    <ThemeProvider theme={GuildsDarkTheme}>
      <GlobalErrorBoundary>
        <TransactionsProvider>
          <GuildsContextProvider>
            <GlobalStyle />
            <Header />
            <Container>
              <GuildAvailabilityProvider>
                <Switch>
                  <Route exact path="/">
                    <Redirect to={`/${defaultChain}`} />
                  </Route>
                  <Route exact path="/:chainName">
                    <LandingPage />
                  </Route>
                  <Route exact path="/:chainName/:guildId">
                    <GuildsPage />
                  </Route>
                  <Route path="/:chainName/:guildId/proposalType">
                    <ProposalTypes data={ProposalTypesConfig} />
                  </Route>
                  <Route path="/:chainName/:guildId/proposal/:proposalId">
                    <ProposalPage />
                  </Route>
                  <Route path="/:chainName/:guildId/create/:proposalType">
                    <CreateProposalPage />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </GuildAvailabilityProvider>
            </Container>
          </GuildsContextProvider>
        </TransactionsProvider>
      </GlobalErrorBoundary>

      <ToastNotificationContainer autoClose={10000} limit={4} />
    </ThemeProvider>
  );
};

export default App;
