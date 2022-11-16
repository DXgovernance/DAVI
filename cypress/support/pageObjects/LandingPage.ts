// 
// Filename: LandingPage.ts
// 

import localhostConfigJSON from '../../../src/configs/localhost/config.json';

class LandingPage  {
  public projectNameText: string;
  public networkModalBtn: string;
  public networkModalTitle: string;
  public networkModalOptionId: string;
  public networkModalOptions: string[];
  public walletModalBtn: string;
  public walletModalTitle: string;
  public walletModalOptionId: string;
  public walletModalOptions: string[];
  public SWPRGuildName: string;

  constructor() {
    this.projectNameText = 'project-name';
    this.networkModalBtn = 'change-network-btn';
    this.networkModalTitle = 'modal-title';
    this.networkModalOptionId = '';
    this.networkModalOptions = localhostConfigJSON.networkOptions;
    this.walletModalBtn = 'connect-wallet-btn';
    this.walletModalTitle = 'modal-title';
    this.walletModalOptionId = '';
    this.walletModalOptions = localhostConfigJSON.walletOptions;
    this.SWPRGuildName = 'guild-name'
  }

  projectName() {
    cy.findByTestId(this.projectNameText).should('be.visible')
  }

  openNetworkModal() {
    cy.findByTestId(this.networkModalBtn)
      .should('be.visible') 
      .click()
    cy.findByTestId(this.networkModalTitle)
      .contains('Switch Network')
  }

  openWalletModal() {
    cy.findByTestId(this.walletModalBtn)
      .should('be.visible') 
      .click()
    cy.findByTestId(this.walletModalTitle)
      .contains('Connect to a wallet')
  }

  goToSWPRGuildPage() {
    cy.findAllByTestId(this.SWPRGuildName).eq(2)
      .contains('SWPRGuild')
      .click()
  }
}

const landingPage = new LandingPage();

export default landingPage;
