describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('./src/index.html')
  })
  it('verificar o titulo da aplicacao', () => {
    
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  }),
  it('preencher campos obrigatorios e enviar', () => {
    const longText = Cypress._.repeat('abc', 10)

    cy.get('#firstName').should('be.visible').type('alexandre')
    cy.get('#lastName').type('moraes')
    cy.get('#email').type('a@g.com')
    cy.get('#phone').type('1')
    cy.get('#product').select('blog')
    cy.get('[type="radio"]').check('elogio')
    cy.get('[type="checkbox"]').check('phone')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.')
    // validadar se aceita somente numeros

    
  }),

  it('mensagem de erro se formato de email invalido', ()=>{
    
    cy.get('#firstName').should('be.visible').type('alexandre')
    cy.get('#lastName').type('moraes')
    cy.get('#email').type('0@g,com')
    cy.get('#phone').type('0')
    cy.get('#product').select('blog')
    cy.get('[type="radio"]').check('elogio')
    cy.get('[type="checkbox"]').check('phone')
    cy.get('#open-text-area').type('hello word')
   cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!')
    // ex 3 ok
  }),


  it('verificar se campo telefone aceita apenas numeros e msg de erro caso obrigatorio', ()=>{
    
    cy.get('#firstName').type('alexandre')
    cy.get('#lastName').type('moraes')
    cy.get('#email').type('0@g.com')
    cy.get('#phone')
    .type('b')
    .should('have.value', '')
    cy.get('[type="checkbox"]').check('phone')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!')
    // extra 4 ok
  }),

  it('preenche e limpa os campos', ()=>{
    
    cy.get('#firstName').type('alexandre').should('have.value', 'alexandre').clear().should('have.value', '')
    cy.get('#lastName').type('moraes').should('have.value', 'moraes').clear().should('have.value', '')
    cy.get('#email').type('0@g.com').should('have.value', '0@g.com').clear().should('have.value', '')
    cy.get('#phone').type('1').should('have.value', '1').clear().should('have.value', '')
    cy.get('#product').select('blog')
    cy.get('[type="radio"]').check('elogio')
    cy.get('[type="checkbox"]').check('phone')
    cy.get('#open-text-area').type('hello word').should
    ('have.value', 'hello word').clear().should('have.value', '')
   cy.contains('button', 'Enviar').click()
    //extra 5 ok
  }),

  it('enviar sem preencher os campos obrigatorios do form', ()=>{
    
   cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!')
    // ex 6 ok
  }),

  it('preencha os campos obrigatórios e envie', () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  }),

  it('usando funcao contains', ()=>{
    
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('[type="radio"]').check('elogio').should('have.value', 'elogio')
    cy.get('[type="checkbox"]').check('phone')
    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.')
  })

  it('seleciona um produto/ empacotamento', () => {
    cy.get('input[type="radio"]')
    .each( typeOfService => {
      cy.wrap(typeOfService)
      .check()
      .should('be.checked')
    })
  })
  it('Marcando e desmarcando entradas checkbox', () => {
    cy.get('[type="checkbox"]')
    .check().should('be.checked')
    .last().uncheck()
    .should('not.be.checked')
    
  })
  it('selecionar um arquivo', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.eql('example.json')
    })
  })
  it('drag an drop', () => {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.eql('example.json')
    })
  })
  it('seleciona um arquivo utilizando fixture para a qual foi data um alias', () =>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload').selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.eql('example.json')
    })
  }) 
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank')
  })
})