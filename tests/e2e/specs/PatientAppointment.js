// https://docs.cypress.io/api/introduction/api.html

describe('Patient Appointment', () => {
  const user = {
    id: '99272cf5-bd9c-4413-b6bf-124ebb45ec80',
    nome: 'Henrique',
    cpf: '460.978.918-30',
  };

  beforeEach(() => {
    sessionStorage.setItem('patient', JSON.stringify(user));
    cy.visit('/paciente/agendamento');
  });

  it('should make an appointment', () => {
    cy.get('.list-doctor__input > input').type('henrique');
    cy.get('.list-doctor__input > button').click();
    cy.get('li').contains('Henrique').click();
    cy.get('.mx-btn-current-year').click();
    cy.get('[data-year="2029"]').click();
    cy.get(':nth-child(3) > .active').click();
    cy.get('[data-day="19"]').click();
    cy.get(':nth-child(3) > .mx-input-wrapper > .mx-input').click();
    cy.get('.mx-scrollbar-wrap > :nth-child(3)').click();
    cy.get('.patient__appointment > .flex > :nth-child(2)').click();
    cy.get('h3').contains('Agendamento feito com sucesso !');
  });

  it('should get an appointment', () => {
    cy.get('.mx-input').clear().type('25/09/2020');
    cy.get('.flex > button').click();
  });
});
