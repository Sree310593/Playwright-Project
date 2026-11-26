const { expect } = require("@playwright/test");


class Cart {
    constructor(page) {
        this.page = page;
    }

    async verifyProductInCart(productName) {
        const productDescription = this.page.locator('td.cart_description').filter({ hasText: productName });
        await expect(productDescription).toBeVisible();
    }

    async getProductsTotal() {
        // Convert displayed cart amounts from text to numbers before summing.
        const prices = await this.page.locator('#cart_info_table tbody tr td.cart_total p').allTextContents();
        return prices.reduce((total, price) => {
            const match = price.match(/(\d+(?:\.\d+)?)/);
            return total + (match ? Number(match[1]) : 0);
        }, 0);
    }

    async proceedToCheckout() {
        await this.page.getByText('Proceed To Checkout', { exact: true }).click();
    }

    async verifyDeliveryAddress(address) {
        // Confirm checkout uses the address entered during registration.
        await expect(this.page.locator('#address_delivery')).toContainText(address);
    }

    async placeOrder() {
        await this.page.locator('.btn.btn-default.check_out').filter({ hasText: 'Place Order' }).click();
    }
}



module.exports = Cart;