// https://docs.cypress.io/api/introduction/api.html

describe('Doctor Appointment', () => {
  sessionStorage.setItem('doctor', { id: 'dd1864b5-8ad6-49c3-a206-0a4b95ea5d32', nome: 'Henrique Suel', crm: '1' });

  beforeEach(() => cy.visit('/doutor/agendamento'));
  it('Should visit the page', () => {
    cy.get('.container > :nth-child(1)').contains('Filtrar');
  });

  it('Should filter with name', () => {
    cy.get('[placeholder="Nome do Paciente"]').type('henrique');
    cy.get('.list-filter__button > button').click();
    cy.get('.list-patient__info').contains('henrique');
  });

  it('Should filter by date', () => {
    cy.get('.mx-input').type('2020-09-20 ~ 2020-09-25').click();
    cy.get('.list-filter__button > button').click();
    cy.get('.list-patient__info').contains('henrique');
  });

  it('Should filter by status', () => {
    cy.get('#Agendado').click();
    cy.get('.list-filter__button > button').click();
    cy.get('.list-patient__info').contains('henrique');
  });

  it('should appear. the link did not attend', () => {
    cy.get('.list-filter__button > button').click();
    cy.get('.list-patient__action > :nth-child(1)').contains('compareçeu');
  });

  it('should go to a consultation registration page', () => {
    cy.get('.list-filter__button > button').click();
    const url = 'registro/e6bf0b5d-c924-497d-a75a-d433ade8b60d';
    cy.get('.list-patient__action > :nth-child(2)').click();
    cy.location('pathname').should('eq', `/${url}`);
  });
});
