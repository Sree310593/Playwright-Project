class DashboardPage {
    constructor(page) {
        this.productCard = page.locator(".card-body");
        this.cartBtn = page.locator("//button[contains(@routerlink,'cart')]");
    }

    async addProductToCart(productName) {
        await this.productCard.first().waitFor();
        await this.productCard
            .filter({ hasText: productName })
            .getByRole("button", { name: /Add To Cart/i })
            .click();
    }

    async openCart() {
        await this.cartBtn.click();
    }
}

module.exports = DashboardPage;
