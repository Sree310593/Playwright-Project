class ProductListingPage {
    constructor(page) {
        this.page = page;
    }

    async addProductToCart(productName) {
        // Scope the action to the product card so similarly named controls are avoided.
        const productCard = this.page.locator('.product-image-wrapper').filter({ hasText: productName });
        await productCard.locator('a.add-to-cart').first().click();
    }

    async continueShopping() {
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    async viewCart() {
        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }
}

module.exports = ProductListingPage;