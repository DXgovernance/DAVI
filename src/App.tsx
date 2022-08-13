import GlobalErrorBoundary from './old-components/Guilds/ErrorBoundary/GlobalErrorBoundary';
import { Header } from 'Components';
import ToastNotificationContainer from './old-components/Guilds/ToastNotifications/ToastNotificationContainer';
import { Container } from './Components/Primitives/Layout';
import GuildsPage from './Modules/Guilds/pages/Guilds';
import ProposalPage from './Modules/Guilds/pages/Proposal';
import GlobalStyle from './theme/GlobalTheme';
import { ProposalTypesConfig } from 'configs/proposalTypes';
import { GuildsContextProvider, TransactionsProvider } from 'contexts/Guilds';
import { ProposalTypes } from 'Components/ProposalTypes';
import CreateProposalPage from 'Modules/Guilds/pages/CreateProposal';
import LandingPage from 'Modules/Guilds/pages/LandingPage';
import NotFound from 'Modules/Guilds/pages/NotFound';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GuildsDarkTheme } from 'Components/theme';
import CreateDiscussionPage from 'Modules/Guilds/pages/CreateDiscussion';

const App = () => {
  return (
    <ThemeProvider theme={GuildsDarkTheme}>
      <GlobalErrorBoundary>
        <TransactionsProvider>
          <GuildsContextProvider>
            <GlobalStyle />
            <Header />
            <Container>
              <Switch>
                <Route exact path="/:chainName">
                  <LandingPage />
                </Route>
                <Route exact path="/:chainName/:guildId">
                  <GuildsPage />
                </Route>
                <Route exact path="/:chainName/:guildId/allproposals">
                  <GuildsPage pageContent={'allProposals'} />
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
                <Route path="/:chainName/:guildId/:discussion">
                  <CreateDiscussionPage />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Container>
          </GuildsContextProvider>
        </TransactionsProvider>
      </GlobalErrorBoundary>

      <ToastNotificationContainer autoClose={10000} limit={4} />
    </ThemeProvider>
  );
};

export default App;
