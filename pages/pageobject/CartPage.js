class CartPage {
    constructor(page) {
        this.cartItem = page.locator("div li");
        this.checkoutBtn = page.locator("//button[contains(text(),'Checkout')]");
    }

    getProduct(productName) {
        return this.cartItem.filter({ hasText: productName });
    }

    async waitForItems() {
        await this.cartItem.first().waitFor();
    }

    async checkout() {
        await this.checkoutBtn.click();
    }
}

module.exports = CartPage;
