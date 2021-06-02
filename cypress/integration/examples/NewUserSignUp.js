/// <reference types="Cypress" />
import SignUpPage from '../../support/pageObjects/SignUpPage'

describe('Sign up Page', function () {
  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })
  it('New user Registration ', function () {
    const singUpPage = new SignUpPage()

    cy.visit(Cypress.env('url'))

    singUpPage.getSignUpLink().click()
    singUpPage.getNameEditor().type(this.data.Name)
    singUpPage.getEmailEditor().type(this.data.userName)
    singUpPage.getPasswordEditor().type(this.data.password)
    singUpPage.getCreateAccountButton().click()
    singUpPage.getSuccessMessage().should('have.text', 'User created Successfully')
  })
})