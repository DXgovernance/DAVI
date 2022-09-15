// 
// Filename: LandingPage.ts
// 

export class LandingPage {
  static getProjectName() {
    return cy.get('[data-testid="projectName"]')
  }
  static getSWPRGuildCard() {
    return cy.get('[data-testid=guildCard]').eq(2)
  }

  static getDXDGuildCard() {
      return cy.get('[data-testid=guildCard]').eq(1)
  }

  static getREPGuildCard() {
      return cy.get('[data-testid=guildCard]').eq(0)
  }

  static getNetworkButton() {
    return cy.get('[data-testid="changeNetworkBtn"]')
  }

  static getNetworkModal() {
    return cy.get('[data-testid="switchNetworkModal"]')
  }

  static checkNetworkOptions() {
    cy.get('[data-testid="network-option-1"]')
      .should('be.visible')
      .contains('Ethereum')
    cy.get('[data-testid="network-option-5"]')
      .should('be.visible')
      .contains('Goerli')
    cy.get('[data-testid="network-option-42161"]')
      .should('be.visible')
      .contains('Arbitrum One')
    cy.get('[data-testid="network-option-421611"]')
      .should('be.visible')
      .contains('Arbitrum Rinkeby')
    cy.get('[data-testid="network-option-100"]')
      .should('be.visible')
      .contains('Gnosis')
    cy.get('[data-testid="network-option-1337"]')
      .should('be.visible')
      .contains('Localhost')
  }

  static getConnectWalletButton() {
    return cy.get('[data-testid="connectWalletBtn"]')
  }

  static getWalletModal() {
    return cy.get('[data-testid="wallet-modal"]')
  }

  static checkWalletOptions() {
    cy.get('[data-testid="wallet-option-injected"]').should('be.visible')
    cy.get('[data-testid="wallet-option-walletConnect"]').should('be.visible')
    cy.get('[data-testid="wallet-option-coinbaseWallet"]').should('be.visible')
  }
}