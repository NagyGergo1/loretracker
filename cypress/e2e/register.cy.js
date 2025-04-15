describe('Registration Page', () => {
  it('Loads page', () => {
    cy.visit('http://localhost/loretracker/registerPage.html')
  })

  it('With no input', () => {
    cy.visit('http://localhost/loretracker/registerPage.html')

    cy.get('#inditas').click()

    cy.get('.alert').contains("Please fill all the blanks!")
  })

  it('With not matching passwords', () => {
    cy.visit('http://localhost/loretracker/registerPage.html')

    cy.get('#registerUsername').type("new user")
    cy.get('#registerSteamId').type("11111111111111111")
    cy.get('#registerEmail').type("usermail@email.com")
    cy.get('#registerPassword').type("password")
    cy.get('#registerConfirmPassword').type("pass")

    cy.get('#inditas').click()

    cy.get('.alert').contains("The passwords don't match!")
  })

  it('With correct data', () => {
    cy.visit('http://localhost/loretracker/registerPage.html')

    cy.get('#registerUsername').type("new user")
    cy.get('#registerSteamId').type("11111111111111111")
    cy.get('#registerEmail').type("usermail@email.com")
    cy.get('#registerPassword').type("password")
    cy.get('#registerConfirmPassword').type("password")

    cy.get('#inditas').click()

    cy.get('h1').contains("Successful registration!")
  })
})