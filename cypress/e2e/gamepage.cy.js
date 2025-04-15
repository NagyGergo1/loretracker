describe('Game Page', () => {
  it('Loads page', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')
    cy.get('#loginEmail').type("abc123@gmail.com")
    cy.get('#loginPassword').type("12345")
    cy.get('#inditas').click()

    cy.get('#toLibrary > div > .active').click()
    cy.get('#jatek1 > .card-body > img').click()

    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost/loretracker/gamePage.html?gameId=1')
    })
  })

  it('Tracked data exists', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')
    cy.get('#loginEmail').type("abc123@gmail.com")
    cy.get('#loginPassword').type("12345")
    cy.get('#inditas').click()

    cy.get('#toLibrary > div > .active').click()
    cy.get('#jatek1 > .card-body > img').click()

    cy.get('#chapter1Section > h2').contains("Gathering Storm")

    cy.get('#sideQuestBtn').click()
    cy.get('#chapter17Section > h2').contains("The Heavenly Strike")

    cy.get('#charactersBtn').click()
    cy.get('#chapter13Section > h2').contains("The Warrior Monk")
  })
})