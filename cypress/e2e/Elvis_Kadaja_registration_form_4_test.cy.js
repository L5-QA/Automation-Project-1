
// Assignement 6: analyze and fix failed test

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
        })



describe('Input fields', () => {
    it('Username cannot be empty string', () => {
        cy.get('#username').type(' ')

        cy.get('h2').contains('Password').click()
        cy.get('#input_error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')
        })

    it('Username tooltip is visible', () => {
        cy.get('#username').type('{enter}')
        cy.get('h2').contains('Password').click()
        cy.get('#username').should('have.attr', 'title').and('contain', 'Please add username')
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        })

    it('Username should have min and max length values 1 and 50 characters', () => {
        cy.get('#username').should('have.attr', 'min', '1')
        cy.get('#username').should('have.attr', 'max', '50')
        })
    it('Username should support only letters and numbers', () => {
        cy.get('#username').should('have.attr', 'pattern').and('contain', '[a-zA-Z0-9_]+');
        });

    it('Email input should support correct pattern', () => {

        const expectedPattern = 'pattern="[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$"';
        cy.get('#email').should('have.attr', 'pattern')
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'background-color', 'rgb(255, 255, 255)')
        cy.get('#email').should('have.css', 'box-shadow', 'rgb(255, 0, 0) 0px 0px 5px 1px')

        cy.get('.submit_button').should('not.be.enabled');
        });

    it('User cannot submit empty registration form', () => {
        cy.get('.submit_button').should('not.be.enabled');
        })
    it('BMW should not be listed in the list of the cars', () => {

        cy.get('#cars').children().should('have.length', 5);
        cy.get('#cars option').first().should('not.have.text', 'BMW')
        cy.get('#cars option').eq(1).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(2).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(3).should('not.have.text', 'BMW')
        cy.get('#cars option').last(4).should('have.text', 'Audi')
        })
        })
