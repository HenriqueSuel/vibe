// https://docs.cypress.io/api/introduction/api.html

describe('Consultation Record', () => {
  const user = {
    id: 'dd1864b5-8ad6-49c3-a206-0a4b95ea5d32',
    nome: 'Henrique Suel',
    crm: '1',
  };

  sessionStorage.setItem('doctor', JSON.stringify(user));

  beforeEach(() => cy.visit('/registro/e6bf0b5d-c924-497d-a75a-d433ade8b60d'));

  it('should be an error', () => {
    cy.get('.flex > :nth-child(2)').click();
    cy.get('.error').contains('Campos Invalidos');
  });

  it('should go back to the scheduling page', () => {
    const url = 'doutor/agendamento';
    cy.get('.flex > :nth-child(1)').click();
    cy.location('pathname').should('eq', `/${url}`);
  });
});
