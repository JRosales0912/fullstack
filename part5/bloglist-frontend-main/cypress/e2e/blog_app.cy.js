

describe('Blog app', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000')
      })
      
    it('front page can be opened', function() {
      cy.contains('div', 'username')
      cy.contains('div', 'password')
    })

    it('login successfull', function() {
        cy.get('input:first').type('user')
        cy.get('input:last').type('pass')
        cy.contains('button','login').click()
        
        cy.contains('button','Logout')
      })

      it('login unsuccessfull', function() {
        cy.get('input:first').type('user')
        cy.get('input:last').type('pass22')
        cy.contains('button','login').click()
        
        cy.contains('div','Wrong credentials')
      })
  })