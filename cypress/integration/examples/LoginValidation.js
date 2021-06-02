/// <reference types="Cypress" />
import LogInPage from '../../support/pageObjects/LogInPage'

describe('Login Page', function () {
  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })

  it('Non registered user login validation', function () {
    const loginPage = new LogInPage()

    cy.visit(Cypress.env('url'))

    loginPage.getEmailAddress().type(this.data.userName)
    loginPage.getPassword().type(this.data.password)
    loginPage.getSignInButton().click()
    loginPage.getErrorText().should('have.text', ' Incorrect email or password ')
  })
})