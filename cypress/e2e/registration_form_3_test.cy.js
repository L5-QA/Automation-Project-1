const user = {
    username: 'L5L5',
    email: 'Lviis@L5.ee',
    firstName: 'Elvis',
    lastName: 'LviisiivL',
    phoneNumber: '555666777',
    password: 'Pass777',
    confirm: 'Pass777'
}

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

describe('Section 1: VISUAL tests by L5', () => {


    it('Check if all  fields exists & are visible', () => {

        cy.get('#name').should('exist').type('L5L5');
        cy.get('.email').should('exist').type('lviis@lviis.ee')
        cy.get('#country').should('exist');
        cy.get('#country');
        cy.get('input[ng-model="checkbox"]').should('exist');
        cy.get('#country option').should('have.length', 4);
        cy.get('#country option').eq(1).should('contain.text', 'Spain');
        cy.get('#country option').eq(2).should('contain.text', 'Estonia');
        cy.get('#country option').eq(3).should('contain.text', 'Austria');

        cy.get('#city').should('exist');
        cy.get('label').contains('Date of registration').should('exist');
        cy.get('input[type="date"]').should('be.visible')
        cy.get('label').contains('Select the frequency of receiving our newsletter').should('be.visible');
        cy.get('label').contains('Select the frequency of receiving our newsletter').parent().find('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).should('be.visible');
            cy.wrap($radio).invoke('attr', 'value').then(($value) => {
                expect($value).to.be.oneOf(['Daily', 'Weekly', 'Monthly', 'Never']);
            });
        });
    })

    it('Check that Country drop-down list changes Cities accordingly ', () => {

        cy.get('#country').select('Spain');
        cy.get('#city').find('option').should('have.length', 5);
        cy.get('#city').find('option').eq(1).should('contain.text', 'Malaga');
        cy.get('#city').find('option').eq(2).should('contain.text', 'Madrid');
        cy.get('#city').find('option').eq(3).should('contain.text', 'Valencia');
        cy.get('#city').find('option').eq(4).should('contain.text', 'Corralejo');

        cy.get('#country').select('Estonia');
        cy.get('#city').find('option').should('have.length', 4);
        cy.get('#city').find('option').eq(1).should('contain.text', 'Tallinn');
        cy.get('#city').find('option').eq(2).should('contain.text', 'Haapsalu');
        cy.get('#city').find('option').eq(3).should('contain.text', 'Tartu');

        cy.get('#country').select('Austria');
        cy.get('#city').find('option').should('have.length', 4);
        cy.get('#city').find('option').eq(1).should('contain.text', 'Vienna');
        cy.get('#city').find('option').eq(2).should('contain.text', 'Salzburg');
        cy.get('#city').find('option').eq(3).should('contain.text', 'Innsbruck');

    })

    it('Check that radio button works properly', () => {

        cy.get('#name').should('exist').type('L5L5');
        cy.get('.email').should('exist').type('lviis@lviis.ee')
        cy.get('label').contains('Select the frequency of receiving our newsletter').should('be.visible');
        cy.get('label').contains('Select the frequency of receiving our newsletter').parent().find('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).should('be.visible');
            cy.wrap($radio).invoke('attr', 'value').then(($value) => {
                expect($value).to.be.oneOf(['Daily', 'Weekly', 'Monthly', 'Never']);
            });
        });

    })

    it('Check only correct e-mail format can be entered', () => {

        cy.get('#name').should('exist').type('L5L5');
        cy.get('.email').should('exist').type('lviis@lviis.ee')
        cy.get('.email').type('invalid_emailaddress.com');
        cy.get('#emailAlert').should('be.visible');
        cy.get('#emailAlert span').should('contain.text', 'Invalid email address.')
    })

})

// FUNCTIONAL TESTS

describe('Section 2: FUNCTIONAL tests by L5', () => {

    it('Check if all  required fields functioning ', () => {
        cy.get('#name').should('exist').type('L5L5');
        cy.get('.email').should('exist').type('lviis@lviis.ee')
        cy.get('#country').should('exist');
        cy.get('#country');
        cy.get('input[ng-model="checkbox"]').should('exist');
        cy.get('#country option').should('have.length', 4);
        cy.get('#country option').eq(1).should('contain.text', 'Spain');
        cy.get('#country option').eq(2).should('contain.text', 'Estonia');
        cy.get('#country option').eq(3).should('contain.text', 'Austria');

        cy.get('#city').should('exist');
        cy.get('label').contains('Date of registration').should('exist');
        cy.get('input[type="date"]').should('be.visible')
        cy.get('label').contains('Select the frequency of receiving our newsletter').should('be.visible');
        cy.get('label').contains('Select the frequency of receiving our newsletter').parent().find('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).should('be.visible');
            cy.wrap($radio).invoke('attr', 'value').then(($value) => {
                expect($value).to.be.oneOf(['Daily', 'Weekly', 'Monthly', 'Never']);
            });
        });
    })

    it('Verify that City drop-down workes and changes after country selecting', () => {

        cy.get('#country').select('Spain');
        cy.get('#city').find('option').should('have.length', 5);
        cy.get('#city').find('option').eq(1).should('contain.text', 'Malaga');
        cy.get('#city').find('option').eq(2).should('contain.text', 'Madrid');
        cy.get('#city').find('option').eq(3).should('contain.text', 'Valencia');
        cy.get('#city').find('option').eq(4).should('contain.text', 'Corralejo');

        cy.get('#country').select('Estonia');
        cy.get('#city').find('option').should('have.length', 4);
        cy.get('#city').find('option').eq(1).should('contain.text', 'Tallinn');
        cy.get('#city').find('option').eq(2).should('contain.text', 'Haapsalu');
        cy.get('#city').find('option').eq(3).should('contain.text', 'Tartu');

        cy.get('#country').select('Austria');
        cy.get('#city').find('option').should('have.length', 4);
        cy.get('#city').find('option').eq(1).should('contain.text', 'Vienna');
        cy.get('#city').find('option').eq(2).should('contain.text', 'Salzburg');
        cy.get('#city').find('option').eq(3).should('contain.text', 'Innsbruck');

    })
    it('Check that frequency radio button works properly', () => {

        cy.get('#name').should('exist').type('L5L5');
        cy.get('.email').should('exist').type('lviis@lviis.ee')
        cy.get('label').contains('Select the frequency of receiving our newsletter').parent().find('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).should('be.visible');
            cy.wrap($radio).invoke('attr', 'value').then(($value) => {
                expect($value).to.be.oneOf(['Daily', 'Weekly', 'Monthly', 'Never']);

            })

        })
    })

    it('Registration successful', () => {
        cy.get('#name').should('exist').type('L5L5');
        cy.get('.email').should('exist').type('lviis@lviis.ee')
        cy.get('#country').should('exist');
        cy.get('#country');
        cy.get('input[ng-model="checkbox"]').should('exist');
        cy.get('#country option').should('have.length', 4);
        cy.get('#country option').eq(1).should('contain.text', 'Spain');
        cy.get('#country option').eq(2).should('contain.text', 'Estonia');
        cy.get('#country option').eq(3).should('contain.text', 'Austria');

        cy.get('#city').should('exist');
        cy.get('label').contains('Date of registration').should('exist');
        cy.get('input[type="date"]').should('be.visible')
        cy.get('label').contains('Select the frequency of receiving our newsletter').should('be.visible');
        cy.get('label').contains('Select the frequency of receiving our newsletter').parent().find('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).should('be.visible');
            cy.wrap($radio).invoke('attr', 'value').then(($value) => {
                expect($value).to.be.oneOf(['Daily', 'Weekly', 'Monthly', 'Never']);



            });
        });
        it('Registration successful', () => {
            cy.get('#name').type(' '); // Assuming a required field with name `#name` is left empty

            // Verify submit button is disabled
            cy.get('input[type="submit"]').should('be.disabled'); // Verify attribute 'disabled' exists


            // Fill out form with valid data (modify as needed)
            cy.get('#name').type('John Doe');
            cy.get('#email').type('valid@email.com'); // Assuming an email field with name `#email`

            // Verify submit button is enabled
            cy.get('input[type="submit"]').should('not.be.disabled'); // Verify attribute 'disabled' is absent

        });


    })



    /*
    BONUS TASK: add visual tests for registration form 3
    Task list:
    * Create test suite for visual tests for registration form 3 (describe block)
    * Create tests to verify visual parts of the page:
        * radio buttons and its content
        * dropdown and dependencies between 2 dropdowns:
            * list of cities changes depending on the choice of country
            * if city is already chosen and country is updated, then city choice should be removed
        * checkboxes, their content and links
        * email format
     */


    /*
    BONUS TASK: add functional tests for registration form 3
    Task list:
    * Create second test suite for functional tests
    * Create tests to verify logic of the page:
        * all fields are filled in + corresponding assertions
        * only mandatory fields are filled in + corresponding assertions
        * mandatory fields are absent + corresponding assertions (try using function)
        * add file functionlity(google yourself for solution!)
     */

})