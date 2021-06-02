class RoomPage {
    getAddRoomButton() {
        return cy.get('.flex.w-full.justify-between a')
    }

    getRoomEditBox() {
        return cy.get("input[type='text']")
    }

    getRoomSubmitButton() {
        return cy.get("button[type='submit']")
    }

    getBackToListLink() {
        return cy.get('.underline')
    }

    getAllRoomList() {
        return cy.get("tbody[class*='text-gray-600'] tr td:nth-child(2) div span")
    }

}

export default RoomPage;