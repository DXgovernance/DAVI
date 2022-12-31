export * from './constants';

export const clickAnywhereToClose = (nodeOrSelector: string = 'body') => {
    cy.get(nodeOrSelector)
    .first()
    .trigger('mousedown', { which: 1, pageX: 1, pageY: 1 });
  cy.get(nodeOrSelector)
    .first()
    .trigger('mouseup', { which: 1, pageX: 1, pageY: 1 });
  return;
};

