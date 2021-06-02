class LogInPage {
    getEmailAddress() {
        return cy.get("[type='email']")
    }

    getPassword() {
        return cy.get("[type='password']")
    }

    getSignInButton() {
        return cy.get('.mat-focus-indicator')
    }

    getSignUpLink() {
        return cy.get("a[class*='no-underline']")
    }

    getErrorText() {
        return cy.get('.text-red-500')
    }

}

export default LogInPage; 