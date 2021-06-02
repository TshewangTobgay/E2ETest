class PendingUsersPage {
    getAllPendingList() {
        return cy.get("tr[class*='border-b'] td:nth-child(3) div span")
    }

    getUserActionButton() {
        return cy.get(".flex.item-center div:nth-child(1)")
    }

}

export default PendingUsersPage; 