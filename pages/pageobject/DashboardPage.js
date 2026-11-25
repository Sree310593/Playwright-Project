class DashboardPage {
    constructor(page) {
        this.productName = "ZARA COAT 3";
        this.productCard = page.locator(".card-body");
        this.cartBtn = page.locator("//button[contains(@routerlink,'cart')]");
    }

}

module.exports = DashboardPage;
