//
// Filename: SmokeREPGuildPage.spec.ts
// Execution: yarn cypress run -s [path-to-file]
//

/// <reference types="cypress" />

import configDevelopmentJSON from '../../config/development.json';
import LandingPage from '../../support/pageObjects/LandingPage';
import AllGuilds from '../../support/pageObjects/AllGuildsPage';
import { WALLET_OPTIONS, clickAnywhereToClose } from '../../utils';

describe('Check REPGuild', () => {
  before(() => {
    cy.visit(configDevelopmentJSON.baseUrl);
    LandingPage.goToGuildPage(0, 'REPGuild');
  });

  it('Check wallet modal from Guild sidebar on REPGuild', () => {
    AllGuilds.openWalletModalFromGuildSidebar();
    cy.findAllByTestId(LandingPage.walletModalOptionId).should(
      'have.length',
      LandingPage.walletModalOptions.length
    );
    Object.values(WALLET_OPTIONS).forEach(option => {
      cy.contains(option).should('be.visible');
    });
    clickAnywhereToClose();
  });

  it('Check Governance page on REPGuild', () => {
    AllGuilds.checkIfYouAreOnGovernancePage();
    AllGuilds.checkProposalsOnGovernancePage();
  });

  it('Check All proposals page on REPGuild', () => {
    AllGuilds.goToAllProposalsPageFromSidebar();
    AllGuilds.checkIfYouAreOnAllProposalsPage();
    AllGuilds.checkStateFiltersOnAllProposalsPage();
    AllGuilds.checkActionFiltersOnAllProposalsPage();
    AllGuilds.checkCurrencyFiltersOnAllProposalsPage();
    AllGuilds.checkSearchbarOnAllProposalPage();
  });

  it('Check Proposal page on REPGuild', () => {
    AllGuilds.goToAllProposalsPageFromSidebar();
    AllGuilds.goToFirstProposalPage();
    AllGuilds.checkIfYouAreOnProposalPage();
  });
});
