// 
// Filename: SmokeLandingPage.ts
// Execution: yarn cypress run -s /Users/filip/Desktop/DXDAO/DAVI-QA/cypress/integration/smoke/SmokeLandingPage.ts
// 

import { LandingPage } from "../../support/pageObjects/LandingPage";
import configDevelopmentJSON from '../../config/development.json';

describe('Check Landing Page', () => {
  beforeEach(() => {
    cy.visit(configDevelopmentJSON.baseUrl)
  })

  it.only('Check project name', () => {
    LandingPage.getProjectName().contains('Project-DAVI')
  })  
  
  it.only('Check if all Guild cards are visible on Landing Page', () => {
    LandingPage.getSWPRGuildCard().should('be.visible')
    LandingPage.getDXDGuildCard().should('be.visible')
    LandingPage.getREPGuildCard().should('be.visible')    
  })

  it.only('Check network modal on Landing page', () => {
    LandingPage.getNetworkButton()
      .should('be.visible')
      .click()
    LandingPage.getNetworkModal()
      .should('be.visible')
      .contains('Switch Network')
    LandingPage.checkNetworkOptions()
  }) 

  it.only('Check wallet modal on Landing page', () => {
    LandingPage.getConnectWalletButton()
      .should('be.visible')
      .click()
    LandingPage.getWalletModal()
      .contains('Connect to a wallet')
    LandingPage.checkWalletOptions()
  }) 
  
})