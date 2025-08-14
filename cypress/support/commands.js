Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Ana',
    lastName : 'julia',
    email: 'asas@as.com',
    text: 'teste.'
    }) => {
    cy.get('#firstName').should('be.visible').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type('1')
    cy.get('#product').select(3).should('have.value', 'mentoria')
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()

})