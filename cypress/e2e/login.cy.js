describe('Login Page', () => {
  it('Loads page', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')
  })

  it('With no input', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')

    cy.get('#inditas').click()

    cy.get('.alert').contains("Please enter your e-mail!")
  })

  it('With only e-mail', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')

    cy.get('#loginEmail').type("joemail@email.com")
    cy.get('#inditas').click()

    cy.get('.alert').contains("Please enter your password!")
  })

  it('With Incorrect data', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')

    cy.get('#loginEmail').type("joemail@email.com")
    cy.get('#loginPassword').type("password")

    cy.get('#inditas').click()

    cy.get('.alert').contains("Incorrect information!")
  })

  it('With correct data', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')

    cy.get('#loginEmail').type("joemail@email.com")
    cy.get('#loginPassword').type("asd123")

    cy.get('#inditas').click()

    cy.get('h2 > b').contains("My Account")
  })

  it('Logout', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')

    cy.get('#loginEmail').type("joemail@email.com")
    cy.get('#loginPassword').type("asd123")

    cy.get('#inditas').click()
    cy.get('#kilepes').click()

    cy.get('h2').contains("Login")
  })
  
})