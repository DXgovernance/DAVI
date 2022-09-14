export class LandingPage {
    static getSWPRGuildCard() {
      return cy.get('[data-testid=guildCard]').eq(2)
    }
    static getDXDGuildCard() {
        return cy.get('[data-testid=guildCard]').eq(1)
    }
    static getREPGuildCard() {
        return cy.get('[data-testid=guildCard]').eq(0)
    }
  }