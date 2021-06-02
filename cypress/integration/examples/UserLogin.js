/// <reference types="Cypress" />
import LogInPage from '../../support/pageObjects/LogInPage'
import Landingpage from '../../support/pageObjects/LandingPage'
import AppointmentPage from '../../support/pageObjects/AppointmentPage'

describe('Sign up Page', function () {

  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })

  let CurrentUser
  it('Existing user Log in', function () {
    const loginPage = new LogInPage()
    const landingPage = new Landingpage()
    const appointmentPage = new AppointmentPage()

    cy.visit(Cypress.env('url'))

    loginPage.getEmailAddress().type(this.data.existingUserName)
    loginPage.getPassword().type(this.data.existingPassword)
    loginPage.getSignInButton().click()

    //Extract current user name
    landingPage.getCurrentUser().then((name) => {
      CurrentUser = name.text().split(',')[1].trim().split('!')[0].trim()
      cy.log(CurrentUser)
    })

    //Check if there is any existing appointments for the current user
    landingPage.getAppointmentLists().each(($e1) => {
      if ($e1.text().includes(CurrentUser)) {
        cy.log('This is my existing appointment')
      }
    })

    //Creating an appointment
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

    //Filter appointments of current user
    landingPage.getDashboardTab().click()
    landingPage.getAppointmentDropDown().click()
    landingPage.getDropDownOption().select('Mine')

    //Check if newly created appointment is in the list
    landingPage.getFilteredAppointment().each(($e1) => {
      if ($e1.text().includes(this.data.agenda)) {
        cy.log('New appointment found in the list')
      }
    })

    //Find total number of appointments of the current user
    landingPage.getAppointmentLists().then(listing => {
      var myAppointments = Cypress.$(listing).length
      cy.log('My total appointments: ' + myAppointments)
    })

    landingPage.getLogOutTab().click()

  }) 
})
