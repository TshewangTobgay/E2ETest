/// <reference types="Cypress" />
import LogInPage from '../../support/pageObjects/LogInPage'
import Landingpage from '../../support/pageObjects/LandingPage'
import PendingUsersPage from '../../support/pageObjects/PendingUsersPage'
import RoomPage from '../../support/pageObjects/RoomPage'
import AppointmentPage from '../../support/pageObjects/AppointmentPage'

describe('Sign up Page', function () {

  before(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })

  let CurrentUser
  it('Admin user activity', function () {
    const loginPage = new LogInPage()
    const landingPage = new Landingpage()
    const pendingUserPage = new PendingUsersPage()
    const roomPage = new RoomPage()
    const appointmentPage = new AppointmentPage()

    cy.visit(Cypress.env('url'))

    loginPage.getEmailAddress().type(this.data.adminUserName)
    loginPage.getPassword().type(this.data.adminPassword)
    loginPage.getSignInButton().click()

    //To approve new signed up user
    landingPage.getUsersTab().click()
    pendingUserPage.getAllPendingList().each(($e1, index) => {
      if ($e1.text() === this.data.newEmail) {
        cy.log('New user found')
        pendingUserPage.getUserActionButton().eq(index).click()
      } else {
        cy.log('New user not found in the list')
      }
    })

    //Extract current user name
    landingPage.getCurrentUser().then((name) => {
      CurrentUser = name.text().split(',')[1].trim().split('!')[0].trim()
      cy.log(CurrentUser)
    })

    //Filter appointments of current user
    landingPage.getDashboardTab().click()
    landingPage.getAppointmentDropDown().click()
    landingPage.getDropDownOption().select('Mine')

    //Appointments of current user
    landingPage.getAppointmentLists().each(($e1) => {
      if ($e1.text().includes(CurrentUser)) {
        cy.log('This is my existing appointment')
      }
    })

    //Find total number of appointments created by the current user
    landingPage.getAppointmentLists().then(listing => {
      var myAppointments = Cypress.$(listing).length
      cy.log(myAppointments)
    })

    //Creating a new room
    landingPage.getRoomsTab().click()
    roomPage.getAddRoomButton().click()
    roomPage.getRoomEditBox().type(this.data.roomName)
    roomPage.getRoomSubmitButton().click()
    roomPage.getBackToListLink().click()
    roomPage.getAllRoomList().each(($e1) => {
      if ($e1.text() === this.data.roomName) {
        cy.log('New room found in the list')
      }
    })

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

    landingPage.getDashboardTab().click()
    landingPage.getFilteredAppointment().each(($e1) => {
      if ($e1.text().includes(this.data.agenda)) {
        cy.log('New appointment found in the list')
      }
    })

    landingPage.getLogOutTab().click()

  })
})

