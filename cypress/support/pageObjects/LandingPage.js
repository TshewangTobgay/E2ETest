class LandingPage {

    getUsersTab() {    
        return cy.get("a[href='/admin/users']")
    }

    getCurrentUser() {
        return cy.get("[class*='h-screen'] div:nth-child(2)")
    }

    getDashboardTab() {
        return cy.get("[href='/dashboard']")
    }

    getAppointmentDropDown() {
        return cy.get(".mt-2 a:nth-child(1)")
    }

    getDropDownOption() {
        return cy.get('select')
    }

    getAppointmentLists() {
        return cy.get(".flex-1.pl-1.mr-16 div:nth-child(2)")
    }

    getFilteredAppointment() {
        return cy.get(".flex-1.pl-1.mr-16 div:nth-child(1)")
    }

    getRoomsTab() {
        return cy.get("[href='/admin/rooms']")
    }

    getAppointmentTab() {
        return cy.get('.mt-2 a:nth-child(2)')
    }

    getLogOutTab() {
        return cy.get('.mt-2 a:nth-child(3)')
    }

}

export default LandingPage;