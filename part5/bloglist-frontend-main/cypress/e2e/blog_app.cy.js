

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

  describe('When logged in', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.get('input:first').type('user')
        cy.get('input:last').type('pass')
        cy.contains('button','login').click()
        cy.contains('button','Logout')
      })

    it('A blog can be created', function() {
        cy.contains('button','new blog').click()
        
        cy.get('input[id="titleInput"]').type('test1')      
        cy.get('input[id="authorInput"]').type('author test')        
        cy.get('input[id="urlInput"]').type('myurls.com') 
        cy.get('input[id="likesInput"]').type('2')

        
        cy.contains('button','add').click()

        cy.contains('div','added')
    })

    
    it('A blog can be liked', function() {
        cy.contains('button','View').first().click()
        
        cy.contains('button','Like').first().click()
    })

    
    
    it('A blog can be delted', function() {
        cy.contains('button','View').first().click()
        
        cy.contains('button','Remove').first().click()
        
        cy.contains('div','Deleted')
    })

    it('A blog can not be deleted', function() {
        cy.contains('button','View').last().click()
        
        cy.contains('button','Remove').not()
    })

    it('The blogs are ordered', function() {
        
        cy.contains('button','View').first().click()
        cy.get('h5[id="likes"]').then(($value)=>{
            const textValue = $value.text().split(' ')[1]
            cy.wrap(textValue).as('wrapValue')
            cy.contains('button','View').last().click()
            cy.get('h5[id="likes"]').then(($bvalue)=>{
                const btextValue = $bvalue.text().split(' ')[1]
                cy.wrap(btextValue).as('wrapValue')
                expect(Number(textValue)).to.be.at.least(Number(btextValue))
            })
        })
    })
})