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

    async selectCountry(searchText, countryName) {
        await this.countryInput.pressSequentially(searchText, { delay: 150 });
        await this.countryDropdown.waitFor();

        const options = this.countryDropdown.locator("button");
        const count = await options.count();
        for (let i = 0; i < count; i++) {
            const option = options.nth(i);
            if ((await option.textContent()).includes(countryName)) {
                await option.click();
                return;
            }
        }

        throw new Error(`Country "${countryName}" was not found.`);
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
        await this.confirmationMessage.waitFor();
        return (await this.orderId.textContent()).replaceAll("|", "").trim();
    }
}

module.exports = CheckoutPage;
