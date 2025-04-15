describe('Main Page', () => {
  it('Loads page', () => {
    cy.visit('http://localhost/loretracker/mainPage.html')

    cy.get('b').contains("Welcome to the Game Lore Page.")
  })

  it('Successfully tracks the given ID', () => {
    cy.visit('http://localhost/loretracker/mainPage.html')

    cy.get('#steamID_input').type("76561198811836115")
    cy.get('#idCheck').click()

    cy.get('#toLibrary > div > .active').click()
    cy.get('#jatek1 > .card-body > img').click()

    cy.get('#chapter1Section > h2').contains("Gathering Storm")
    cy.get('#chapter12Section > h2').contains("Mono No Aware")
  })
})