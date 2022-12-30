export * from './constants';

export const clickAnywhereToClose = (nodeOrSelector: string = 'body') => {
  return cy.get(nodeOrSelector).first().click(1, 1, { force: true }).wait(1000);
};

