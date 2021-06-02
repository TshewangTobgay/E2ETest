class SignUpPage {

    getSignUpLink() {
        return cy.get("a[class*='no-underline']")
    }

    getNameEditor() {
        return cy.get("[data-placeholder='user name']")
    }

    getEmailEditor() {
        return cy.get("[type='email']")
    }

    getPasswordEditor() {
        return cy.get("input[type='password']")
    }

    getCreateAccountButton() {
        return cy.get("button[type='submit']")
    }

    getSuccessMessage() {
        return cy.get('h2.font-medium')
    }

}

export default SignUpPage; 