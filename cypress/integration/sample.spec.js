/// <reference types="cypress"/>

describe('Application Flow', () => {

    beforeEach(() => { 
        cy.visit('http://localhost:3000/');
    })
        
    it('has the record table', () => { 
        cy.get('.record-table').should('be.visible');
    })

    it('adds a new record', () => {
        cy.get('.plus').click()
        cy.get('.add-form').should('be.visible')
        cy.get('.date').type('2021-07-20')
        cy.get('input[name=numconf]').type(10)
        cy.get('.add').click()
    })

    it('updates the added record', () => {
        //cy.get('.record-table').scrollTo('bottom')
        cy.get('.record-table').contains('2021-07-20').click()
        cy.get('#edit-modal').should('be.visible')
        cy.get('.numprob').type(31)
        cy.get('.update-button').click()

        /*Check if the last row is updated correctly*/
        cy.get('.record-table').contains('2021-07-20').click()
        cy.get('.numprob').should('have.text', ' 31 ')
        
    })

    it('deletes the added record', () => {
        cy.get('.record-table').contains('2021-07-20').click()
        cy.get('.delete-button').click()
        cy.get('.record-table').should('not.contain', '2021-07-20')
    })
})
