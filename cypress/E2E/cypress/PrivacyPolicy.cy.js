it('teste de forma independente a politica de privacidade', () => {
    cy.visit('./src/privacy.html')

    cy.get('#title').should('be.visible').contains('CAC TAT - Política de Privacidade')
})