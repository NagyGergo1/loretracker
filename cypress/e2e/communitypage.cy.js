describe('Community Page', () => {
  it('Loads page', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')
    cy.get('#loginEmail').type("abc123@gmail.com")
    cy.get('#loginPassword').type("12345")
    cy.get('#inditas').click()

    cy.get('#toLibrary > div > .active').click()
    cy.get('#jatek1 > .card-body > img').click()
    cy.get('#communityLink').click()

    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost/loretracker/communityPage.html?gameId=1')
    })    
  })

  it('Creates, edits, and deletes a post', () => {
    cy.visit('http://localhost/loretracker/loginPage.html')
    cy.get('#loginEmail').type("abc123@gmail.com")
    cy.get('#loginPassword').type("12345")
    cy.get('#inditas').click()

    cy.get('#toLibrary > div > .active').click()
    cy.get('#jatek1 > .card-body > img').click()
    cy.get('#communityLink').click()

    //new post
    cy.get('#newPostBtn').click()
    cy.get('#newPostTitle').type("New title")
    cy.get('#newPostSection').select("Chapter 1: Gathering Storm")
    cy.get('#newPostText').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum")
    cy.get('#newPostSubmit').click()

    cy.get(':nth-child(1) > .card-header > :nth-child(1) > h5').contains("New title")
  })
})