import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import LogInPage from '../../../../support/pageObjects/LogInPage'
import SignUpPage from '../../../../support/pageObjects/SignUpPage'
import LandingPage from '../../../../support/pageObjects/LandingPage'
import PendingUsersPage from '../../../../support/pageObjects/PendingUsersPage'
import RoomPage from '../../../../support/pageObjects/RoomPage'
import AppointmentPage from '../../../../support/pageObjects/AppointmentPage'

const loginPage = new LogInPage()
const singUpPage = new SignUpPage()
const landingPage = new LandingPage()
const pendingUserPage = new PendingUsersPage()
const roomPage = new RoomPage()
const appointmentPage = new AppointmentPage()

let CurrentUser

Given('I opened Login page', () => {
    cy.visit(Cypress.env('url'))
})

When('I give user credentials', function () {
    loginPage.getEmailAddress().type(this.data.userName)
    loginPage.getPassword().type(this.data.password)
})

And('Click on Login Button', () => {
    loginPage.getSignInButton().click()
})

Then('Throws the error message', () => {
    loginPage.getErrorText().should('have.text', ' Incorrect email or password ')
})


And('Click on SignUp Link', () => {
    singUpPage.getSignUpLink().click()
})

When('I give user registration details', function () {
    singUpPage.getNameEditor().type(this.data.Name)
    singUpPage.getEmailEditor().type(this.data.userName)
    singUpPage.getPasswordEditor().type(this.data.password)
})

And('Click on Create Account Button', () => {
    singUpPage.getCreateAccountButton().click()
})

Then('Displays success message', () => {
    singUpPage.getSuccessMessage().should('have.text', 'User created Successfully')
})


When('I log in as Admin user', function () {
    loginPage.getEmailAddress().type(this.data.adminUserName)
    loginPage.getPassword().type(this.data.adminPassword)
    loginPage.getSignInButton().click()
})

Then('I go through the list and check if previously created user is there', function () {
    landingPage.getUsersTab().click()
    pendingUserPage.getAllPendingList().each(($e1, index) => {
        if ($e1.text() === this.data.newEmail) {
            cy.log('New user found')
            pendingUserPage.getUserActionButton().eq(index).click()
        } else {
            cy.log('New user not found in the list')
        }
    })

    And('Extract current user name from dashboard', () => {
        landingPage.getCurrentUser().then((name) => {
            CurrentUser = name.text().split(',')[1].trim().split('!')[0].trim()
            cy.log(CurrentUser)
        })
    })

    Then('Check if there is any existing appointments', () => {
        landingPage.getDashboardTab().click()
        landingPage.getAppointmentDropDown().click()
        landingPage.getDropDownOption().select('Mine')

        landingPage.getAppointmentLists().each(($e1) => {
            if ($e1.text().includes(CurrentUser)) {
                cy.log('This is my existing appointment')
            }
        })

        landingPage.getAppointmentLists().then(listing => {
            var myAppointments = Cypress.$(listing).length
            cy.log(myAppointments)
        })
    })

    When('I create a new room', function () {
        landingPage.getRoomsTab().click()
        roomPage.getAddRoomButton().click()
        roomPage.getRoomEditBox().type(this.data.roomName)
        roomPage.getRoomSubmitButton().click()
        roomPage.getBackToListLink().click()
    })

    And('Check if new room is added to the lists', function () {
        roomPage.getAllRoomList().each(($e1) => {
            if ($e1.text() === this.data.roomName) {
                cy.log('New room found in the list')
            }
        })
    })

    Then('I create an appointment', function () {
        landingPage.getAppointmentTab().click()
        appointmentPage.getAgenaEditor().type(this.data.agenda)
        appointmentPage.getDescriptionEditor().type(this.data.description)
        appointmentPage.getStartDateInput().type(this.data.appStartDate)
        appointmentPage.getEndDateInput().type(this.data.appEndDate)
        appointmentPage.getRoomDropDown().click()
        appointmentPage.getRoomOption().each(($e1) => {
            if ($e1.text().includes(this.data.roomName)) {
                $e1.click()
            }
        })

        appointmentPage.getTimeEditor().click()
        appointmentPage.getAptHour().click()
        appointmentPage.getAptMin().click({ force: true })
        appointmentPage.getTimeOKButton().click()

        appointmentPage.getAddParticipantButton().click()
        appointmentPage.getParticipantEditor().type(this.data.participant)
        appointmentPage.getParticipantSubmitButton().click()
        appointmentPage.getAptDetails().click()
    })

    And('Check if new appointment is added into the lists', function () {
        landingPage.getDashboardTab().click()
        landingPage.getFilteredAppointment().each(($e1) => {
            if ($e1.text().includes(this.data.agenda)) {
                cy.log('New appointment found in the list')
            }
        })
    })

    Then('I log out the account', () => {
        landingPage.getLogOutTab().click()
    })

    And('I log in with registered user', function () {
        loginPage.getEmailAddress().type(this.data.existingUserName)
        loginPage.getPassword().type(this.data.existingPassword)
        loginPage.getSignInButton().click()
    })

    When('I create an appointment', function () {
        landingPage.getAppointmentTab().click()
        appointmentPage.getAgenaEditor().type(this.data.agenda2)
        appointmentPage.getDescriptionEditor().type(this.data.description2)
        appointmentPage.getStartDateInput().type(this.data.appStartDate2)
        appointmentPage.getEndDateInput().type(this.data.appEndDate2)

        appointmentPage.getRoomDropDown().click()
        appointmentPage.getRoomOption().each(($e1) => {
            if ($e1.text().includes(this.data.roomName)) {
                $e1.click()
            }
        })

        appointmentPage.getTimeEditor().click()

        appointmentPage.getAptHour().click()
        appointmentPage.getAptMin().click({ force: true })
        appointmentPage.getTimeOKButton().click()

        appointmentPage.getAddParticipantButton().click()
        appointmentPage.getParticipantEditor().type(this.data.participant)
        appointmentPage.getParticipantSubmitButton().click()
        appointmentPage.getAptDetails().click()
    })

})