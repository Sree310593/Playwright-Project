class CartPage {
    constructor(page) {
        this.cartItem = page.locator("div li");
        this.checkoutBtn = page.locator("//button[contains(text(),'Checkout')]");
    }

}

module.exports = CartPage;
