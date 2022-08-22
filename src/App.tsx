import GlobalErrorBoundary from './old-components/Guilds/ErrorBoundary/GlobalErrorBoundary';
import { Header } from 'Components';
import ToastNotificationContainer from './old-components/Guilds/ToastNotifications/ToastNotificationContainer';
import { Container } from './Components/Primitives/Layout';
import { GuildsPage } from './Modules/Guilds/pages/Guilds';
import { ProposalPage } from './Modules/Guilds/pages/Proposal';
import GlobalStyle from './theme/GlobalTheme';
import { ProposalTypesConfig } from 'configs/proposalTypes';
import { GuildsContextProvider, TransactionsProvider } from 'contexts/Guilds';
import { ProposalTypes } from 'Components/ProposalTypes';
import CreateProposalPage from 'Modules/Guilds/pages/CreateProposal';
import { LandingPage } from 'Modules/Guilds/pages/LandingPage';
import NotFound from 'Modules/Guilds/pages/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GuildsDarkTheme } from 'Components/theme';
import CreateDiscussionPage from 'Modules/Guilds/pages/CreateDiscussion';
import { useNetwork } from 'wagmi';

const App = () => {
  const {
    chain: { network },
  } = useNetwork();

  return (
    <ThemeProvider theme={GuildsDarkTheme}>
      <GlobalErrorBoundary>
        <TransactionsProvider>
          <GuildsContextProvider>
            <GlobalStyle />
            <Header />
            <Container>
              <Routes>
                <Route path="/" element={<Navigate replace to={network} />} />
                <Route path="/:chainName" element={<LandingPage />} />
                <Route path="/:chainName/:guildId" element={<GuildsPage />} />
                <Route
                  path="/:chainName/:guildId/allProposals"
                  element={<GuildsPage pageContent={'allProposals'} />}
                />
                <Route
                  path="/:chainName/:guildId/proposalType"
                  element={<ProposalTypes data={ProposalTypesConfig} />}
                />
                <Route
                  path="/:chainName/:guildId/proposal/:proposalId"
                  element={<ProposalPage />}
                />
                <Route
                  path="/:chainName/:guildId/createProposal"
                  element={<CreateProposalPage />}
                />
                <Route
                  path="/:chainName/:guildId/create"
                  element={<CreateDiscussionPage />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </GuildsContextProvider>
        </TransactionsProvider>
      </GlobalErrorBoundary>

      <ToastNotificationContainer autoClose={10000} limit={4} />
    </ThemeProvider>
  );
};

export default App;
