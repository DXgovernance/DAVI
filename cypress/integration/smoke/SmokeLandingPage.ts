import { LandingPage } from "../../pages/LandingPage";
// import localhostConfigJSON from '../../../src/configs/localhost/config.json';

describe('Check Landing Page', () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/#/localhost")
    })
  
it.only('Check All Cards visible on Liquidity Page', () => {

    LandingPage.getSWPRGuildCard().should('be.visible')
        
    })
    
  
  })