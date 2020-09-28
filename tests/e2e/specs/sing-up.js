// https://docs.cypress.io/api/introduction/api.html

describe('sing-up', () => {
  beforeEach(() => cy.visit('/cadastro'));
  it('Should visit the page', () => {
    cy.get('.register__title').contains('Cadastre-se');
  });

  it('should register a doctor', () => {
    const url = '';
    cy.get('[placeholder="Nome"]').type('henrique');
    cy.get('.mx-input').click();
    cy.get('.mx-btn-current-year').click();
    cy.get('.mx-icon-double-left').click();
    cy.get('.mx-icon-double-left').click();
    cy.get('.mx-icon-double-left').click();
    cy.get('[data-year="1996"]').click();
    cy.get('[data-month="4"] > div').click();
    cy.get('[data-day="27"]').click();
    cy.get('[placeholder="CRM"]').type('12345678910');
    cy.get('.button-primary').click();
    cy.location('pathname').should('eq', `/${url}`);
  });

  it('should register a patient', () => {
    const url = '';
    cy.get('.js-patient').click();
    cy.get('[placeholder="Nome"]').type('henrique');
    cy.get('.mx-input').click();
    cy.get('.mx-btn-current-year').click();
    cy.get('.mx-icon-double-left').click();
    cy.get('.mx-icon-double-left').click();
    cy.get('.mx-icon-double-left').click();
    cy.get('[data-year="1996"]').click();
    cy.get('[data-month="4"] > div').click();
    cy.get('[data-day="27"]').click();
    cy.get('[placeholder="CPF"]').type('12345678930');
    cy.get('.button-primary').click();
    cy.location('pathname').should('eq', `/${url}`);
  });

  it('should go to the login page', () => {
    const url = '';
    cy.get('.router-link-active').click();
    cy.location('pathname').should('eq', `/${url}`);
  });
});
