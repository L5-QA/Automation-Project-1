beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Functional Tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        cy.get('#username').type('JohnSmith')
        cy.get('#email').type('John.Smith@gmail.com')
        cy.get('[name="name"]').type('John')
        cy.get('#lastName').type('Smith')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        cy.get('[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.window().scrollTo('bottom')
        cy.get('#password_error_message').contains('Passwords do not match!')
        // Change the test, so the passwords would match
        // Add assertion, that submit button is now enabled
        // Add assertion, that success message is visible
        // Add assertion, that error message is not visible anymore
        cy.get('[name="confirm"]').clear().type('Password123')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain','User successfully submitted registration')
        cy.get('#password_error_message').should('not.be.visible') 
    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('#username').type('JohnSmith')
        cy.get('#email').type('John.Smith@gmail.com')
        cy.get('[name="name"]').type('John')
        cy.get('#lastName').type('Smith')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('[type="radio"]').eq(2).check().should('be.checked')
        cy.get('[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('#cars').select(3).invoke('val').should('eq','audi')
        cy.get('#animal').select(1).invoke('val').should('eq','cat')
        cy.get('[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        // Assert that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain','User successfully submitted registration')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Fill in ONLY mandatory fields
        // using function, which fills in all mandatory data
        inputValidData('johnDoe')
        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain','User successfully submitted registration')
    })

    it('User cannot submit form without mandatory field EMAIL', ()=>{
        // Fill in mandatory fields
        cy.get('#username').type('JohnSmith')
        cy.get('#email').type('John.Smith@gmail.com')
        cy.get('[name="name"]').type('John')
        cy.get('#lastName').type('Smith')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        // Clear EMAIL field
        cy.get('#email').clear() 
        cy.get('h2').contains('Password').click()
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.window().scrollTo('bottom')
        cy.get('#input_error_message').contains('Mandatory input field is not valid or empty!')
        })
})

/*
Visual Tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check first logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        // Similar test for checking the second picture
        cy.log('Will check second logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 116 and greater than 80
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 80)   
    });

    it('Check navigation part and first link', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part and second link', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkboxes list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the checkbox's fields
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        // Verify default state of checkbox's fields
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // One can check and uncheck checkbox's fields
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).uncheck().should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        // Create screenshot from the code:
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        // Create screenshot from the code:
        // Select second element and create screenshot for this area or full page
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        // Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        // Advanced level how to check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo','cow','mouse'])
        })
    })

}) 

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
} 