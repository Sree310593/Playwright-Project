class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.getByPlaceholder("Select Country");
        this.countryDropdown = page.locator(".ta-results");
        this.emailSummary = page.locator('.user__name [type="text"]').first();
        this.placeOrderBtn = page.locator(".action__submit");
        this.confirmationMessage = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted").first();
    }

}

module.exports = CheckoutPage;
