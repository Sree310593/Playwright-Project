class OrdersPage {
    constructor(page) {
        this.orderButton = page.locator("//i[@class='fa fa-handshake-o']");
        this.orderRows = page.locator("tbody tr");
        this.orderIdSummaryPage = page.locator("//div[@class='col-text -main']");
    }

    async openOrder(orderId) {
        await this.orderButton.click();
        await this.orderRows.first().waitFor();

        const count = await this.orderRows.count();
        for (let i = 0; i < count; i++) {
            const row = this.orderRows.nth(i);
            const rowOrderId = (await row.locator("th").textContent()).trim();
            if (orderId.includes(rowOrderId)) {
                await row.locator("button").first().click();
                await this.orderIdSummaryPage.waitFor();
                return;
            }
        }

        throw new Error(`Order "${orderId}" was not found.`);
    }
}

module.exports = OrdersPage;
