// 
// Filename: SmokeDXDGuildPage.spec.ts
// Execution: yarn cypress run -s [path-to-file]
// 

/// <reference types="cypress" />

import configDevelopmentJSON from '../../config/development.json';
import LandingPage from "../../support/pageObjects/LandingPage";
import AllGuilds from "../../support/pageObjects/AllGuildsPage";
import {
    WALLET_OPTIONS,
    clickAnywhereToClose
  } from '../../utils';

describe('Check DXDGuild', () => {
    before(() => {
      cy.visit(configDevelopmentJSON.baseUrl);
      LandingPage.goToGuildPage(1, 'DXDGuild');
    });

    it('Check wallet modal from Guild sidebar on DXDGuild', () => {
      AllGuilds.openWalletModalFromGuildSidebar()
      cy.findAllByTestId(LandingPage.walletModalOptionId)
        .should('have.length', LandingPage.walletModalOptions.length
      );
      Object.values(WALLET_OPTIONS).forEach(option => {
        cy.contains(option)
          .should('be.visible');
      });
      clickAnywhereToClose();
    });

    it('Check Governance page on DXDGuild', () => {
      AllGuilds.checkIfYouAreOnGovernancePage();
      AllGuilds.checkProposalsOnGovernancePage();
    });

    it('Check All proposals page on DXDGuild', () => {
      AllGuilds.goToAllProposalsPageFromSidebar();
      AllGuilds.checkIfYouAreOnAllProposalsPage();
      AllGuilds.checkStateFiltersOnAllProposalsPage();
      AllGuilds.checkActionFiltersOnAllProposalsPage();
      AllGuilds.checkCurrencyFiltersOnAllProposalsPage();
      AllGuilds.checkSearchbarOnAllProposalPage();
    });

    it('Check Proposal page on DXDGuild', () => {
      AllGuilds.goToAllProposalsPageFromSidebar();
      AllGuilds.goToFirstProposalPage();
      AllGuilds.checkIfYouAreOnProposalPage();
    });

});