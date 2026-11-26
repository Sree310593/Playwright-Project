const { expect } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
    }


    async verifyOrderConfirmation() {
        // The full confirmation sentence is rendered in the main content container.
        await expect(this.page.locator("//div[@class='col-sm-9 col-sm-offset-1']")).toContainText('Your order has been confirmed');
    }
}

module.exports = OrderConfirmationPage;