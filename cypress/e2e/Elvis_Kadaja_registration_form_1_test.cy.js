// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */

describe('This is first test suite Elvis Kadaja', () => {
    //Assignment 3: add the content to the following tests
    //10.07.24

    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Pass777')
        cy.get('[name="confirm"]').type('Pass777')
        cy.get('#username').type('L5L5')
        cy.get('#firstName').type('Lviis')
        cy.get('#lastName').type('LviisiivL')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('L5L5')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Lviis')
        cy.get('#lastName').type('LviisiivL')
        cy.get('input[name="password"]').type('Pass77')
        cy.get('[name="confirm"]').type('Pass777')
        cy.get('[name="confirm"]').type('{enter}')
        cy.window().scrollTo('bottom')
        cy.get('#password_error_message').should('be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('not.be.visible')
        cy.get('.submit_button').should('be.disabled')
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').clear('none')
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Lviis')
        cy.get('#lastName').type('LviisiivL')
        cy.get("input[name='password']").type('Pass777')
        cy.get('[name="confirm"]').type('Pass777')
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('#input_error_message').should('have.css', 'display', 'block')

    it('User cannot submit data when phone number is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]')
        cy.get('input[name="password"]').type('Pass777')
        cy.get('[name="confirm"]').type('Pass777')
        cy.get('#username').type('L5L5')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#success_message').should('have.css', 'display', 'none')
    });
    
    it('User cannot submit data when password and/or confirmation password is absent', () => {
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('input[name="password"]').type('Pass777')
            cy.get('[name="confirm"]')
            cy.get('#username').type('L5L5')
            cy.get('h2').contains('Password').click()
            cy.get('.submit_button').should('not.be.enabled')
            cy.get('#input_error_message').should('not.be.visible')
            cy.get('#password_error_message').should('have.css', 'display', 'none')
            cy.get('#success_message').should('not.be.visible')
            cy.get('#success_message').should('have.css', 'display', 'none')
        });

    it('User cannot add letters to phone number', () => {
        
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get('[data-testid="phoneNumberTestId"]').type('Lviis')
        cy.get('#firstName').type('Lviis')
        cy.get('#lastName').type('LviisiivL')
        cy.get('input[name="password"]').type('Pass777')
        cy.get('[name="confirm"]').type('Pass777')
        cy.get('#username').type('L5L5')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#success_message').should('have.css', 'display', 'none')
    });

        
    })
})