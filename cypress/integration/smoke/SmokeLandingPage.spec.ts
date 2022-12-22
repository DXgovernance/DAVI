// 
// Filename: SmokeLandingPage.spec.ts
// Execution: yarn cypress run -s [path-to-file]
// 

/// <reference types="cypress" />

import LandingPage from "../../support/pageObjects/LandingPage";
import Guilds from '../../support/pageObjects/Guilds';
import configDevelopmentJSON from '../../config/development.json';
import {
  DEPLOYED_GUILDS_NAMES,
  NETWORK_OPTIONS,
  WALLET_OPTIONS,
  clickAnywhereToClose
} from '../../utils';

describe('Check Landing Page', () => {
  before(() => {
    //TODO: improve this step
    cy.visit(configDevelopmentJSON.baseUrl);
  });

  it('Check project name', () => {
    LandingPage.projectName();
  });  
  
  it('Check if all Guild cards are visible on Landing Page', () => {
    cy.findAllByTestId(Guilds.guildCardId).should(
      'have.length', Guilds.deployedGuilds.length
    );
    Object.values(DEPLOYED_GUILDS_NAMES).forEach(name => {
      cy.contains(name)
        .should('be.visible');
    });    
  });

  it('Check network modal on Landing page', () => {
    LandingPage.openNetworkModal();
    cy.findAllByTestId(LandingPage.networkModalOptionId)
      .should('have.length', LandingPage.networkModalOptions.length
    );
    Object.values(NETWORK_OPTIONS).forEach(option => {
    // we have two elements with 'Localhost' name
      if (option == 'Localhost') {
        cy.get('[data-testid]').eq(5)
          .should('be.visible');
      } 
      else {
        cy.contains(option)
          .should('be.visible');
      }
    });
    clickAnywhereToClose();
  });

  it('Check wallet modal on Landing page', () => {
    LandingPage.openWalletModal();
    cy.findAllByTestId(LandingPage.walletModalOptionId)
      .should('have.length', LandingPage.walletModalOptions.length
    );
    Object.values(WALLET_OPTIONS).forEach(option => {
      cy.contains(option)
        .should('be.visible');
    });
    clickAnywhereToClose();
  })
})
