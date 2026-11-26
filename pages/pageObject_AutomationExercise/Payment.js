class Payment {
    constructor(page) {
        this.page = page;
    }

    async enterCardDetails(nameOnCard, cardNumber, cvc, expirationMonth, expirationYear) {
        // Use form names because these inputs do not expose reliable accessible labels.
        await this.page.locator('input[name="name_on_card"]').fill(nameOnCard);
        await this.page.locator('input[name="card_number"]').fill(cardNumber);
        await this.page.locator('input[name="cvc"]').fill(cvc);
        await this.page.locator('input[name="expiry_month"]').fill(expirationMonth);
        await this.page.locator('input[name="expiry_year"]').fill(expirationYear);
    }

    async payAndConfirmOrder() {
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    }
}

module.exports = Payment;