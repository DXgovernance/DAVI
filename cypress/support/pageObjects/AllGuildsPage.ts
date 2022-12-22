// 
// Filename: AllGuildPages.ts
// 

import localhostConfigJSON from '../../../src/configs/localhost/config.json';
import {
  STATE_FILTER_OPTIONS,
  ACTION_FILTER_OPTIONS,
  CURRENCY_FILTER_OPTION
} from '../../utils';

class AllGuilds {  
  public guildName: string;
  public governancePage: string;
  public allProposalsPage: string;
  public noActiveProposalsMessage: string;
  public allProposalsPageHyperlink: string;
  public proposalList: string;
  public proposalCard: string;
  public guildPageProposalTitle: string;
  public proposalState: string;
  public stateFilterBtn: string;
  public actionFilterBtn: string;
  public currencyFilterBtn: string;
  public stateFilterOption: string;
  public actionFilterOption: string;
  public currencyFilterOption: string;
  public stateFilterOptions: string[];
  public actionFilterOptions: string[];
  public currencyFilterOptions: string[];
  public searchbarBtn: string;
  public searchbarInputField: string;
  public proposalPageProposalTitle: string;

  constructor() {
    this.guildName = 'guild-name';
    this.governancePage = 'governance-page';
    this.allProposalsPage = 'all-proposals-page';
    this.noActiveProposalsMessage = 'no-active-proposals-message';
    this.allProposalsPageHyperlink = 'all-proposals-hyperlink';
    this.proposalList = 'proposals-list';
    this.proposalCard = 'proposal-card';
    this.guildPageProposalTitle = 'proposal-title';
    this.proposalState = 'proposal-state';
    this.stateFilterBtn = 'state-filter-btn';
    this.actionFilterBtn = 'action-filter-btn';
    this.currencyFilterBtn = 'currency-filter-btn';
    this.stateFilterOption = 'state-dropdown-option';
    this.actionFilterOption = 'action-dropdown-option';
    this.currencyFilterOption = 'currency-dropdown-option';
    this.stateFilterOptions = localhostConfigJSON.stateFilterOptions;
    this.actionFilterOptions = localhostConfigJSON.actionFilterOptions;
    this.currencyFilterOptions = localhostConfigJSON.currencyFilterOptions;
    this.searchbarBtn = 'search-btn-all-proposals';
    this.searchbarInputField = 'search-bar-all-proposals';
    this.proposalPageProposalTitle = 'proposal-page-title';
  }

  checkIfYouAreOnSWPRGuildPage() {
    cy.findAllByTestId(this.guildName)
      .contains('SWPRGuild');
  }

  checkIfYouAreOnREPGuildPage() {
    cy.findAllByTestId(this.guildName)
      .contains('REPGuild');
  }

  checkIfYouAreOnDXDGuildPage() {
    cy.findAllByTestId(this.guildName)
      .contains('DXDGuild');
  }

  openWalletModalFromGuildSidebar() {
    cy.get('button').eq(2)
      .contains('Connect Wallet')
      .click();
  }

  checkIfYouAreOnGovernancePage() {
    cy.findByTestId(this.governancePage)
      .contains('Governance')
      .should('have.css', 'color', 'rgb(255, 255, 255)');
  }

  checkProposalsOnGovernancePage() {
    cy.wait(2000)
    cy.get('[data-testid="proposals-list"]')
      .then(($el) => {
        if ($el.text().includes('There are no active proposals.')) {
          cy.findByTestId(this.noActiveProposalsMessage)
            .should('be.visible')
            .contains('There are no active proposals. Go to all proposals page.');
          this.goToAllProposalsPageViaHyperlink();
          this.checkIfYouAreOnAllProposalsPage();
        }
        else {
          cy.findAllByTestId(this.proposalCard)
            .first()
            .should('be.visible');
          cy.findAllByTestId(this.proposalState)
            .first()
            .contains(/Active|Executable/);    
        }
      })
  }

  goToAllProposalsPageFromSidebar() {
    cy.findByTestId(this.allProposalsPage)
      .contains('All proposals')
      .click();
  }

  goToAllProposalsPageViaHyperlink() {
    cy.findByTestId(this.allProposalsPageHyperlink)
      .contains('Go to all proposals page.')
      .click();
  }

  checkIfYouAreOnAllProposalsPage() {
    cy.wait(500)
    cy.findByTestId(this.allProposalsPage)
      .should('have.css', 'color', 'rgb(255, 255, 255)');
  }

  checkStateFiltersOnAllProposalsPage() {
    cy.findByTestId(this.stateFilterBtn)
      .contains('State')
      .click()
    cy.findAllByTestId(this.stateFilterOption)
      .should('have.length', this.stateFilterOptions.length
      );
    Object.values(STATE_FILTER_OPTIONS).forEach(option => {
      cy.contains(option)
        .should('be.visible');
    });
  }

  checkActionFiltersOnAllProposalsPage() {
    cy.findByTestId(this.actionFilterBtn)
      .contains('Action')
      .click()
    cy.findAllByTestId(this.actionFilterOption)
      .should('have.length', this.actionFilterOptions.length
      );
    Object.values(ACTION_FILTER_OPTIONS).forEach(option => {
      cy.contains(option)
        .should('be.visible');
    });
  }

  checkCurrencyFiltersOnAllProposalsPage() {
    cy.findByTestId(this.currencyFilterBtn)
      .contains('Currency')
      .click();
    cy.findAllByTestId(this.currencyFilterOption)
      .should('have.length', this.currencyFilterOptions.length
      );
    Object.values(CURRENCY_FILTER_OPTION).forEach(option => {
      cy.contains(option)
        .should('be.visible');
    });
  }

  checkSearchbarOnAllProposalPage() {
    cy.findByTestId(this.searchbarBtn)
      .should('be.visible')
      .click();
    cy.findByTestId(this.searchbarInputField)
      .should('be.visible')
      .get('input[placeholder=\"Search proposal, discussion, ENS, address\"]');
  }

  goToFirstProposalPage() {
    cy.wait(5000)
    cy.findAllByTestId(this.guildPageProposalTitle)
      .first()
      .click();
  }

  checkIfYouAreOnProposalPage() {
    cy.findByTestId(this.proposalPageProposalTitle)
      .should('be.visible')
  }
  
}

const allGuilds: AllGuilds = new AllGuilds();

export default allGuilds;