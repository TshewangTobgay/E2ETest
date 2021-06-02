class AppointmentPage {
    getAgenaEditor() {
        return cy.get("[ng-reflect-name='agenda']")
    }

    getDescriptionEditor() {
        return cy.get("textarea[id*='mat-input']")
    }

    getStartDateInput() {
        return cy.get("[placeholder='Start date']")
    }

    getEndDateInput() {
        return cy.get("[placeholder='End date']")
    }

    getRoomDropDown() {
        return cy.get("[formcontrolname='roomId']")
    }

    getRoomOption() {
        return cy.get("[role='option']")
    }

    getTimeEditor() {
        return cy.get("[ng-reflect-name='time']")
    }

    getAptHour() {
        return cy.get("div.clock-face__container div:nth-child(9)")
    }

    getAptMin() {
        return cy.get(".clock-face div div:nth-child(21)")
    }

    getTimeOKButton() {
        return cy.get(".timepicker__actions div:nth-child(2)")
    }

    getAddParticipantButton() {
        return cy.get("div[class*='rounded-lg p-2'] button")
    }

    getParticipantEditor() {
        return cy.get("[placeholder='name required']")
    }

    getParticipantSubmitButton() {
        return cy.get("[type='submit']")
    }

    getAptDetails() {
        return cy.get(".underline")
    }
}

export default AppointmentPage; 