export * from './constants';

export const clickAnywhereToClose = (nodeOrSelector: string = 'body') => {
  return cy.get(nodeOrSelector).first().click(0, 0).wait(1000);
};

