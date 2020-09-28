// https://docs.cypress.io/api/introduction/api.html

describe('login', () => {
  beforeEach(() => cy.visit('/'));

  it('Should visit the page', () => {
    cy.get('.login__title').contains('Entrar na minha conta');
  });

  it('should change profile', () => {
    cy.get('.js-patient')
      .click()
      .should('have.class', 'active');
    cy.get('input')
      .type('12345678910')
      .should('have.value', '123.456.789-10');
    cy.get('.js-doctor')
      .click()
      .should('have.class', 'active');
  });

  it('should put mask on the input', () => {
    cy.get('.js-patient')
      .click()
      .should('have.class', 'active');
    cy.get('input')
      .type('12345678910')
      .should('have.value', '123.456.789-10');
    cy.get('.js-doctor')
      .click()
      .should('have.class', 'active');
    cy.get('input')
      .type('12345678910')
      .should('have.value', '12345678910');
  });

  it('should enter as a patient', () => {
    const url = 'paciente/agendamento';
    cy.get('.js-patient').click();
    cy.get('input').type('46097891830');
    cy.get('.login__form__submit').click();
    cy.location('pathname').should('eq', `/${url}`);
  });

  it('should enter as a doctor', () => {
    const url = 'doutor/agendamento';
    cy.get('.js-doctor').click();
    cy.get('input').type('1');
    cy.get('.login__form__submit').click();
    cy.location('pathname').should('eq', `/${url}`);
  });

  it('should be an error in the input', () => {
    cy.get('.js-patient').click();
    cy.get('input').type('4609789183');
    cy.get('.mensage-error').contains('CPF Invalido');

    cy.get('.js-doctor').click();
    cy.get('.mensage-error').contains('CRM Invalido');
  });

  it("shouldn't find a user", () => {
    cy.get('.js-patient').click();
    cy.get('input').type('46097891832');
    cy.get('.login__form__submit').click();
    cy.get('.container').contains('Usuário não encontrado');
  });

  it('should go to the registration page', () => {
    const url = 'cadastro';
    cy.get('.login__register > a').click();
    cy.location('pathname').should('eq', `/${url}`);
  });
});
