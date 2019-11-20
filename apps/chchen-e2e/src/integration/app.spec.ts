import { getGreeting } from '../support/app.po';

describe('chchen', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to chchen!');
  });
});
