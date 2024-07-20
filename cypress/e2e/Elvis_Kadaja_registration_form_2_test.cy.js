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
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/
import { faker } from '@faker-js/faker'
describe('Section 1: Functional tests by L5', () => {

    it('User can use only same both first and validation passwords', () => {

        cy.get('#username').type('L5L5')
        cy.get("#email").type("lviis@cerebrum.com")
        cy.get('[data-cy="name"]').type("Lviis");
        cy.get('#lastName').type('LviisiivL')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Pass777')

        cy.get("#confirm").type("Pass555");
        cy.get("h2").contains("Password").click();
        cy.get('[name="confirm"]').type("{enter}");
        cy.window().scrollTo("bottom");
        cy.get("#password_error_message").should("be.visible").should("contain", "Passwords do not match!");
        cy.get("#success_message").should("not.be.visible");
        cy.get("button.submit_button").should("not.be.enabled");
        cy.get('input[name="confirm"]').should("have.attr", "title", "Both passwords should match");

        cy.get("#confirm").clear().type("Pass777");
        cy.get("h2").contains("Password").click();
        cy.get("#password_error_message").should("not.be.visible");
        cy.get("#success_message").should("not.be.visible");
        cy.get("button.submit_button").should("be.enabled").click();
        cy.get("#success_message").should("be.visible").should("contain", "User successfully submitted registration");
        cy.get("#success_message").should("have.css", "display", "block");
    })

    it('User can submit form with all fields added', () => {

        cy.get('#username').type('L5L5')
        cy.get("#email").type("lviis@cerebrum.com")
        cy.get('[data-cy="name"]').type("Lviis");
        cy.get('#lastName').type('LviisiivL')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[type="radio"]').eq(2).check().should("be.checked");
        cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
        cy.get('#cars').select('Saab')
        cy.get('#animal').select('Dog')
        cy.get('input[name="password"]').type('Pass777');
        cy.get("#confirm").type("Pass777");
        cy.get("h2").contains("Password").click();
        cy.get("#password_error_message").should("not.be.visible");
        cy.get("#success_message").should("not.be.visible");
        cy.get("button.submit_button").should("be.enabled");
        cy.get("button.submit_button").click();
        cy.get("#success_message").should("be.visible").should("contain", "User successfully submitted registration");
        cy.get("#success_message").should("have.css", "display", "block");
    })

    it("User can submit form with valid data and only mandatory fields added", () => {
        inputValidData("L5L5");
        cy.get("button.submit_button").should("be.enabled").click();
        cy.get("#input_error_message").should("not.be.visible");
        cy.get("#password_error_message").should("have.css", "display", "none");
        cy.get("#success_message").should("be.visible").should("contain", "User successfully submitted registration");
        cy.get("#success_message").should("have.css", "display", "block");
    });

    it('User can not submit form with mandatory field "email" is absent', () => {
        inputValidData('username')
        cy.get("#email").clear("lviis@cerebrum.com")
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })
    /*
    Assignement 5: create more visual tests.
    */

    describe('Section 2: Visual tests by L5', () => {

        it('Check that logo is correct and has correct size', () => {
            cy.log('Will check logo source and size')
            cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
            cy.get('img').invoke('height').should('be.lessThan', 167).and('be.greaterThan', 147)
            cy.get('img').invoke('width').should('be.lessThan', 188).and('be.greaterThan', 127)

        })

        it('My test for second picture', () => {
            cy.get("[data-cy='cypress_logo']").should("be.visible").and('have.attr', 'src', 'cypress_logo.png')
                .invoke('height').should('be.lessThan', 89).and('be.greaterThan', 77)
            cy.get("[data-cy='cypress_logo']").invoke('width').should('be.lessThan', 117).and('be.greaterThan', 107)

        });

        it('Check navigation part', () => {
            cy.get('nav').children().should('have.length', 2)
            cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
            cy.get('nav').children().eq(0).should('be.visible').and('have.attr', 'href', 'registration_form_1.html').click()
            cy.url().should('contain', '/registration_form_1.html')
            cy.go('back')
            cy.log('Back again in registration form 2')
        })

        it('Check navigation part, second link', () => {
            cy.get('nav').children().should('have.length', 2)
            cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
            cy.get('nav').children().eq(1).should('be.visible')
                .and('have.attr', 'href', 'registration_form_3.html')
                .click()
            cy.url().should('contain', '/registration_form_3.html')
            cy.go('back')
            cy.log('Back again in registration form 2 ')
        })

        it('Check that radio button list is correct', () => {

            cy.get('input[type="radio"]').should('have.length', 4);
            cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
            cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
            cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
            cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

            cy.get('input[type="radio"]').eq(0).should('not.be.checked');
            cy.get('input[type="radio"]').eq(1).should('not.be.checked')
            cy.get('input[type="radio"]').eq(2).should('not.be.checked')
            cy.get('input[type="radio"]').eq(3).should('not.be.checked');

            cy.get('input[type="radio"]').eq(0).check().should('be.checked');
            cy.get('input[type="radio"]').eq(1).check().should('be.checked')
            cy.get('input[type="radio"]').eq(2).check().should('be.checked')
            cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        })


        it('Check that checkbox Veichles list is correct', () => {

            cy.get('input[type="checkbox"]').should('have.length',3)

            cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
            cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
            cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

            cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
            cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
            cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

            cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
            cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')

        })

        it('Car dropdown is correct', () => {

            cy.get('#cars').select(2).screenshot('Cars drop-down')
            cy.screenshot('Full page screenshot')

            cy.get('#cars').children().should('have.length',4)
            cy.get('#cars').find('option').should('have.length',4)
            cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
            cy.get('#cars').find('option').eq(1).should('have.text', 'Saab')
            cy.get('#cars').find('option').eq(2).should('have.text', 'Opel')
            cy.get('#cars').find('option').eq(3).should('have.text', 'Audi')

            // Advanced level how to check the content of the Cars dropdown
            cy.get('#cars').find('option').then(options => {
                const actual = [...options].map(option => option.value)
                expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
            })
        })
        it('Favorite animal dropdown is correct', () => {

            cy.get('#animal').select(2).screenshot('Animal drop-down')
            cy.screenshot('Full page screenshot')
            cy.get('#animal').find('option').should('have.length', 6)
            cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
            cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
            cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
            cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
            cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
            cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

            // Advanced level how to check the content of the animals dropdown
            cy.get('#animal').find('option').then(options => {
                const actual = [...options].map(option => option.value);
                expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse']);
            });
            })
            })
            })

 function inputValidData(L5L5) {
    cy.log("Username will be filled");
    cy.get('input[data-testid="user"]').type("L5L5");
    cy.get("#email").type("lviis@lviis.ee");
    cy.get('[data-cy="name"]').type("Elvis");
    cy.get("#lastName").type("LviisiivL");
    cy.get('[data-testid="phoneNumberTestId"]').type("555666777");
    cy.get("#password").type("Pass777");
    cy.get("#confirm").type("Pass777");
    cy.get("h2").contains("Password").click();
}